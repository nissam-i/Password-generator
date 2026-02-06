import React from 'react';
import { Copy, RefreshCw, Check, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';
import { usePasswordGenerator } from '../hooks/usePasswordGenerator';
import { cn } from '../lib/utils';

export const PasswordGenerator = () => {
    const { password, strength, options, setOptions, generatePassword } = usePasswordGenerator();
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
        if (!password) return;
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getStrengthColor = (s: number) => {
        if (s === 0) return 'bg-gray-600';
        if (s <= 1) return 'bg-red-500';
        if (s === 2) return 'bg-yellow-500';
        if (s === 3) return 'bg-blue-500';
        return 'bg-green-500';
    };

    const getStrengthLabel = (s: number) => {
        if (s === 0) return 'Weak';
        if (s <= 1) return 'Weak';
        if (s === 2) return 'Fair';
        if (s === 3) return 'Good';
        return 'Strong';
    };

    return (
        <div className="w-full max-w-md p-8 glass-card rounded-3xl border border-white/10 relative overflow-hidden group">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/20 blur-[100px] rounded-full -z-10 group-hover:bg-primary/30 transition-all duration-700" />

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    Password Gen
                </h1>
                <p className="text-white/50 text-sm mt-2">Generate secure passwords instantly</p>
            </div>

            {/* Password Display */}
            <div className="relative mb-8 group/display">
                <div className="w-full p-6 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-between transition-all hover:border-primary/50">
                    <div className="font-mono text-2xl text-white break-all pr-4 tracking-wider">
                        {password}
                    </div>
                    <div className="flex gap-2 shrink-0">
                        <button
                            onClick={handleCopy}
                            className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                            title="Copy to clipboard"
                        >
                            {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={generatePassword}
                            className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                            title="Regenerate"
                        >
                            <RefreshCw className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="space-y-6">
                {/* Length Slider */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-white/70">Password Length</span>
                        <span className="text-primary font-bold">{options.length}</span>
                    </div>
                    <input
                        type="range"
                        min="6"
                        max="32"
                        value={options.length}
                        onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all"
                    />
                </div>

                {/* Checkboxes */}
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: 'Uppercase', key: 'hasUppercase', char: 'ABC' },
                        { label: 'Lowercase', key: 'hasLowercase', char: 'abc' },
                        { label: 'Numbers', key: 'hasNumbers', char: '123' },
                        { label: 'Symbols', key: 'hasSymbols', char: '!@#' },
                    ].map((opt) => (
                        <label key={opt.key} className="flex items-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 cursor-pointer transition-all hover:bg-white/10">
                            <input
                                type="checkbox"
                                checked={options[opt.key as keyof typeof options] as boolean}
                                onChange={(e) => setOptions({ ...options, [opt.key]: e.target.checked })}
                                className="w-5 h-5 rounded border-white/30 text-primary bg-transparent focus:ring-offset-0 focus:ring-primary/50"
                            />
                            <div className="ml-3 flex flex-col">
                                <span className="text-sm text-white/90">{opt.label}</span>
                                <span className="text-xs text-white/40">{opt.char}</span>
                            </div>
                        </label>
                    ))}
                </div>

                {/* Strength Meter */}
                <div className="bg-white/5 rounded-xl p-4 mt-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">Security Strength</span>
                        <span className={cn("text-xs font-bold uppercase tracking-wider",
                            strength <= 1 ? "text-red-400" :
                                strength === 2 ? "text-yellow-400" :
                                    strength === 3 ? "text-blue-400" : "text-green-400"
                        )}>
                            {getStrengthLabel(strength)}
                        </span>
                    </div>
                    <div className="flex gap-1 h-1.5 w-full">
                        {[0, 1, 2, 3].map((index) => (
                            <div
                                key={index}
                                className={cn("h-full rounded-full flex-1 transition-all duration-500",
                                    index < strength ? getStrengthColor(strength) : "bg-white/10"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
