FROM node:20-alpine AS build

WORKDIR /app

# Inject API URL at image build time for Vite
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Copy dependency manifests first to leverage Docker layer cache
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .
RUN npm run build

# Serve the static files with Nginx
FROM nginx:stable-alpine AS runtime

# Default for local runs
ENV PORT=80

# Copy the build output (dist folder) from the first stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx template
COPY nginx.conf /etc/nginx/templates/default.conf.template

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1:${PORT}/ || exit 1

CMD ["nginx", "-g", "daemon off;"]