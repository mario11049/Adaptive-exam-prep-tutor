import React from 'react';
import {
  AlertTriangle,
  TrendingDown,
  Users,
  Lightbulb,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const MisconceptionTrends: React.FC = () => {
  const misconceptionStats = [
    {
      name: 'Inverse Ratio Confusion',
      fullName: "Direct Proportionality Assumption in Ohm's Law (I ∝ R)",
      concept: "Ohm's Law & V-I Characteristics",
      affectedCount: 14,
      percentage: 44,
      severity: 'High',
      quote: '"Since resistance increased to 8 ohms, it has more resistance so it pulls more current."',
      explanation: 'Students associate the word "resistance" with power or effort, expecting higher values to draw higher amperage rather than restricting charge flow.'
    },
    {
      name: 'Parallel Inversion Omission',
      fullName: 'Omission of Final Reciprocal Step in Parallel Resistors',
      concept: 'Resistors in Parallel Combination',
      affectedCount: 11,
      percentage: 34,
      severity: 'High',
      quote: '"1/Rp = 1/6 + 1/12 = 1/4, so total resistance is 0.25 ohms."',
      explanation: 'Students perform the fraction addition correctly but forget to invert 1/Rp to obtain Rp = 4 ohms, producing an absurdly tiny equivalent resistance.'
    },
    {
      name: 'Series Current Attenuation',
      fullName: 'Current Consumption Myth in Resistor Chains',
      concept: 'Resistors in Series Combination',
      affectedCount: 9,
      percentage: 28,
      severity: 'Medium',
      quote: '"The second resistor gets less current because the first resistor absorbed some electric power."',
      explanation: 'Violates conservation of charge: students envision electric current as a consumable fuel that diminishes sequentially down a wire.'
    },
    {
      name: 'kWh Tariff Metric Error',
      fullName: 'Kilowatt-Hour Metric Conversion Fallacy',
      concept: 'Electric Power & Commercial Energy Units',
      affectedCount: 8,
      percentage: 25,
      severity: 'Medium',
      quote: '"Multiplying 400W by 8 hours gives 3200 kWh."',
      explanation: 'Students neglect dividing Watts by 1000 to convert into commercial units (kWh), inflating calculated billing costs by a factor of 1000.'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#E16D78]">
          <AlertTriangle className="h-4 w-4" />
          <span>Classroom Error Taxonomy & Trend Analytics</span>
        </div>
        <h2 className="mt-1 font-heading text-xl font-bold text-[#17213D]">
          Misconception Prevalence & Cognitive Trends
        </h2>
        <p className="text-xs text-gray-500">
          Synthesized patterns from Class 10-A student written justifications.
        </p>
      </div>

      {/* Chart: Frequency of Class Misconceptions */}
      <div className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card">
        <h3 className="font-heading text-base font-bold text-[#17213D] mb-1">
          Affected Student Distribution by Misconception
        </h3>
        <p className="text-xs text-gray-500 mb-4">Number of Class 10-A students demonstrating specific reasoning bugs</p>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={misconceptionStats} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEF0F7" />
              <XAxis dataKey="name" stroke="#9FAAC2" fontSize={11} tickLine={false} interval={0} />
              <YAxis stroke="#9FAAC2" fontSize={11} tickLine={false} domain={[0, 16]} />
              <Tooltip
                formatter={(val: any) => [`${val} students (${Math.round((val / 32) * 100)}%)`, 'Affected Students']}
                labelFormatter={(name, payload) => payload?.[0]?.payload?.fullName || name}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E6F0',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="affectedCount" fill="#E16D78" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Misconception Deep-Dive Cards */}
      <div className="space-y-4">
        {misconceptionStats.map((item, idx) => (
          <div
            key={idx}
            className="rounded-card border border-[#E2E6F0] bg-white p-6 shadow-card transition-all hover:shadow-card-hover"
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-heading text-base font-bold text-[#17213D]">
                    {item.fullName}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      item.severity === 'High'
                        ? 'bg-[#FDEFF0] text-[#E16D78]'
                        : 'bg-[#FEF6E9] text-[#E6A448]'
                    }`}
                  >
                    {item.severity} Prevalence
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-[#6658D3] font-semibold">
                  Associated Concept: {item.concept}
                </p>
              </div>

              <div className="rounded-xl bg-[#F7F8FC] border border-[#E2E6F0] px-3 py-1.5 text-right shrink-0">
                <span className="text-[10px] uppercase font-bold text-gray-400">Affected</span>
                <div className="font-metric text-lg font-extrabold text-[#E16D78]">
                  {item.affectedCount} / 32 <span className="text-xs font-semibold">({item.percentage}%)</span>
                </div>
              </div>
            </div>

            {/* Representative Quote & Pedagogical Diagnostic */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#F6B8BD] bg-[#FDEFF0]/40 p-3.5 text-xs">
                <span className="font-bold text-[#E16D78] block mb-1">
                  Typical Anonymized Student Justification:
                </span>
                <p className="italic text-gray-800">{item.quote}</p>
              </div>

              <div className="rounded-xl border border-[#E2E6F0] bg-[#F7F8FC] p-3.5 text-xs">
                <span className="font-bold text-gray-600 block mb-1">
                  Underlying Cognitive Mechanism:
                </span>
                <p className="text-gray-700 leading-relaxed">{item.explanation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
