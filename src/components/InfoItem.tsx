function InfoItem({ icon, label, value }: any) {
    return (
        <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            {icon} {label}
            </label>
            <p className="text-sm font-bold text-gray-800">{value}</p>
        </div>
    );
}

export default InfoItem