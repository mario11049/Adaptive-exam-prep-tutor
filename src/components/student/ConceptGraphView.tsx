import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CONCEPTS_CBSE_ELECTRICITY,
  CONCEPT_EDGES
} from '../../data/curriculumData';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Flame,
  Info,
  Layers,
  X
} from 'lucide-react';

interface NodePosition {
  x: number;
  y: number;
}

// Fixed pedagogical graph layout coordinates for CBSE Electricity concepts
const NODE_COORDINATES: Record<string, NodePosition> = {
  elec_01: { x: 80, y: 140 },  // Electric Charge & Current
  elec_02: { x: 80, y: 320 },  // Electric Potential
  elec_03: { x: 300, y: 230 }, // Ohm's Law (Central hub)
  elec_04: { x: 500, y: 120 }, // Factors affecting Resistance
  elec_05: { x: 500, y: 340 }, // Series Resistors
  elec_06: { x: 720, y: 120 }, // Parallel Resistors
  elec_07: { x: 720, y: 340 }, // Joule's Law of Heating
  elec_08: { x: 920, y: 230 }, // Electric Power & Energy
};

export const ConceptGraphView: React.FC = () => {
  const {
    studentMastery,
    selectedConceptId,
    setSelectedConceptId,
    misconceptions,
    setActiveStudentTab
  } = useApp();

  const [zoom, setZoom] = useState(1);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sidePanelOpen, setSidePanelOpen] = useState(true);

  const selectedConcept =
    CONCEPTS_CBSE_ELECTRICITY.find(c => c.id === selectedConceptId) ||
    CONCEPTS_CBSE_ELECTRICITY[2]; // Default Ohm's Law

  const selectedMastery = studentMastery[selectedConcept.id];
  const selectedMisc = misconceptions.filter(m => m.conceptId === selectedConcept.id);

  // Filter concepts based on search & filter
  const filteredConcepts = CONCEPTS_CBSE_ELECTRICITY.filter(concept => {
    const matchesSearch =
      concept.name.toLowerCase().includes(search.toLowerCase()) ||
      concept.code.toLowerCase().includes(search.toLowerCase());
    const mastery = studentMastery[concept.id]?.masteryPercentage ?? 50;

    if (filterStatus === 'mastered') return matchesSearch && mastery >= 80;
    if (filterStatus === 'needs_practice') return matchesSearch && mastery < 50;
    if (filterStatus === 'developing') return matchesSearch && mastery >= 50 && mastery < 80;
    return matchesSearch;
  });

  return (
    <div className="space-y-4 animate-fade-in relative">
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-[#E2E6F0] bg-white p-4 shadow-card">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search concept nodes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] py-1.5 pl-9 pr-3 text-xs text-[#17213D] focus:border-[#6658D3] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-1.5 rounded-btn bg-[#EEF0F7] p-1 text-xs">
            <button
              onClick={() => setFilterStatus('all')}
              className={`rounded-md px-2.5 py-1 font-semibold ${
                filterStatus === 'all' ? 'bg-white text-[#17213D] shadow-sm' : 'text-gray-500'
              }`}
            >
              All (8)
            </button>
            <button
              onClick={() => setFilterStatus('mastered')}
              className={`rounded-md px-2.5 py-1 font-semibold ${
                filterStatus === 'mastered' ? 'bg-white text-[#159B85] shadow-sm' : 'text-gray-500'
              }`}
            >
              Mastered
            </button>
            <button
              onClick={() => setFilterStatus('needs_practice')}
              className={`rounded-md px-2.5 py-1 font-semibold ${
                filterStatus === 'needs_practice' ? 'bg-white text-[#E16D78] shadow-sm' : 'text-gray-500'
              }`}
            >
              Needs Practice
            </button>
          </div>
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center rounded-btn border border-[#E2E6F0] bg-white p-1">
            <button
              onClick={() => setZoom(prev => Math.min(1.4, prev + 0.1))}
              className="rounded p-1 hover:bg-[#EEF0F7] text-gray-600"
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <span className="px-2 text-xs font-semibold text-gray-500">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(prev => Math.max(0.6, prev - 0.1))}
              className="rounded p-1 hover:bg-[#EEF0F7] text-gray-600"
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => setZoom(1)}
            className="rounded-btn border border-[#E2E6F0] bg-white p-2 text-gray-600 hover:bg-[#EEF0F7]"
            title="Reset Zoom"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Canvas & Side Panel Container */}
      <div className="relative flex h-[620px] w-full overflow-hidden rounded-card border border-[#E2E6F0] bg-[#F7F8FC] shadow-card">
        {/* Interactive SVG Canvas */}
        <div className="relative flex-1 overflow-auto p-4 cursor-grab">
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
              transition: 'transform 200ms ease-out',
              width: '1100px',
              height: '560px'
            }}
            className="relative select-none"
          >
            {/* SVG Connecting Prerequisite Edges */}
            <svg
              className="absolute inset-0 pointer-events-none"
              width="1100"
              height="560"
            >
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#CBD2E1" />
                </marker>
                <marker
                  id="arrow-active"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#6658D3" />
                </marker>
              </defs>

              {CONCEPT_EDGES.map((edge, idx) => {
                const src = NODE_COORDINATES[edge.sourceId];
                const tgt = NODE_COORDINATES[edge.targetId];
                if (!src || !tgt) return null;

                const isConnectedToSelected =
                  edge.sourceId === selectedConceptId || edge.targetId === selectedConceptId;

                // Bezier curve midpoint control
                const dx = tgt.x - src.x;
                const dy = tgt.y - src.y;
                const cx1 = src.x + dx * 0.5;
                const cy1 = src.y;
                const cx2 = src.x + dx * 0.5;
                const cy2 = tgt.y;

                return (
                  <path
                    key={`edge-${idx}`}
                    d={`M ${src.x + 80} ${src.y + 40} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${tgt.x} ${tgt.y + 40}`}
                    fill="none"
                    stroke={isConnectedToSelected ? '#6658D3' : '#CBD2E1'}
                    strokeWidth={isConnectedToSelected ? 2.5 : 1.5}
                    strokeDasharray={isConnectedToSelected ? undefined : '4 4'}
                    markerEnd={isConnectedToSelected ? 'url(#arrow-active)' : 'url(#arrow)'}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>

            {/* Concept Nodes */}
            {CONCEPTS_CBSE_ELECTRICITY.map(concept => {
              const pos = NODE_COORDINATES[concept.id];
              if (!pos) return null;

              const mastery = studentMastery[concept.id];
              const score = mastery?.masteryPercentage ?? 50;
              const isSelected = concept.id === selectedConceptId;

              // Node Status Colors
              let borderColor = 'border-[#CBD2E1]';
              let badgeBg = 'bg-gray-100 text-gray-700';
              let indicatorColor = 'bg-gray-400';

              if (score >= 80) {
                borderColor = 'border-[#A3E8DC] hover:border-[#159B85]';
                badgeBg = 'bg-[#E2F7F3] text-[#159B85]';
                indicatorColor = 'bg-[#159B85]';
              } else if (score >= 50) {
                borderColor = 'border-[#F8D8A8] hover:border-[#E6A448]';
                badgeBg = 'bg-[#FEF6E9] text-[#E6A448]';
                indicatorColor = 'bg-[#E6A448]';
              } else {
                borderColor = 'border-[#F6B8BD] hover:border-[#E16D78]';
                badgeBg = 'bg-[#FDEFF0] text-[#E16D78]';
                indicatorColor = 'bg-[#E16D78]';
              }

              if (isSelected) {
                borderColor = 'border-[#6658D3] ring-2 ring-[#6658D3]/30 shadow-card-hover';
              }

              return (
                <div
                  key={concept.id}
                  onClick={() => {
                    setSelectedConceptId(concept.id);
                    setSidePanelOpen(true);
                  }}
                  style={{
                    position: 'absolute',
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    width: '180px'
                  }}
                  className={`group cursor-pointer rounded-card border-2 bg-white p-3.5 shadow-card transition-all duration-200 hover:-translate-y-1 ${borderColor}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] font-bold text-gray-400">
                      {concept.code}
                    </span>
                    <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${badgeBg}`}>
                      {score}%
                    </span>
                  </div>

                  <h4 className="mt-1 font-heading text-xs font-bold leading-snug text-[#17213D] group-hover:text-[#6658D3]">
                    {concept.name}
                  </h4>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-gray-500">
                    <div className="flex items-center space-x-1">
                      <span className={`h-2 w-2 rounded-full ${indicatorColor}`} />
                      <span>{score >= 80 ? 'Mastered' : score >= 50 ? 'Developing' : 'Needs Practice'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Canvas Legend */}
          <div className="absolute bottom-4 left-4 rounded-xl border border-[#E2E6F0] bg-white/95 p-2.5 shadow-sm backdrop-blur-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
              Mastery Legend
            </span>
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1">
                <span className="h-2.5 w-2.5 rounded-full bg-[#159B85]" />
                <span className="text-[11px] text-gray-600">Mastered (&gt;80%)</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E6A448]" />
                <span className="text-[11px] text-gray-600">Developing (50–79%)</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E16D78]" />
                <span className="text-[11px] text-gray-600">Needs Practice (&lt;50%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Concept Details Side Panel (PART 6D) */}
        {sidePanelOpen && (
          <div className="w-88 shrink-0 overflow-y-auto border-l border-[#E2E6F0] bg-white p-6 shadow-popover animate-fade-in">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#6658D3]">
                  {selectedConcept.code}
                </span>
                <h3 className="mt-1 font-heading text-lg font-bold text-[#17213D]">
                  {selectedConcept.name}
                </h3>
              </div>
              <button
                onClick={() => setSidePanelOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Current Mastery Card */}
            <div className="mt-4 rounded-xl border border-[#E2E6F0] bg-[#F7F8FC] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">Current Mastery</span>
                <span className="font-metric text-xl font-extrabold text-[#17213D]">
                  {selectedMastery?.masteryPercentage ?? 50}%
                </span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-[#EEF0F7] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#6658D3]"
                  style={{ width: `${selectedMastery?.masteryPercentage ?? 50}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-gray-500">
                Confidence estimate: {Math.round((selectedMastery?.confidenceScore || 0.6) * 100)}% based on recent written reasoning.
              </p>
            </div>

            {/* Concept Explanation */}
            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Concept Summary
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-gray-700">
                {selectedConcept.description}
              </p>
            </div>

            {/* Prerequisites */}
            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Prerequisite Concepts
              </h4>
              {selectedConcept.prerequisites.length > 0 ? (
                <div className="mt-2 space-y-1.5">
                  {selectedConcept.prerequisites.map(prereqId => {
                    const prereq = CONCEPTS_CBSE_ELECTRICITY.find(c => c.id === prereqId);
                    return (
                      <div
                        key={prereqId}
                        onClick={() => setSelectedConceptId(prereqId)}
                        className="flex cursor-pointer items-center justify-between rounded-lg border border-[#E2E6F0] p-2 text-xs hover:border-[#6658D3]"
                      >
                        <span className="font-semibold text-[#17213D]">{prereq?.name}</span>
                        <span className="text-[10px] text-[#6658D3]">View →</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-1 text-xs text-gray-400">None (Foundational Concept)</p>
              )}
            </div>

            {/* Detected Misconceptions */}
            {selectedMisc.length > 0 && (
              <div className="mt-5 rounded-xl border border-[#F6B8BD] bg-[#FDEFF0] p-3 text-xs">
                <div className="flex items-center space-x-1.5 text-[#E16D78] font-bold">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Detected Misconception</span>
                </div>
                <p className="mt-1 text-[11px] text-gray-700 font-medium">
                  "{selectedMisc[0].tag.replace(/_/g, ' ')}"
                </p>
                <p className="mt-1 text-[11px] text-gray-600">
                  {selectedMisc[0].evidence}
                </p>
              </div>
            )}

            {/* Recommended Next Action */}
            <div className="mt-6 border-t border-[#E2E6F0] pt-4">
              <button
                onClick={() => {
                  setSelectedConceptId(selectedConcept.id);
                  setActiveStudentTab('practice');
                }}
                className="flex w-full items-center justify-center space-x-2 rounded-btn bg-[#6658D3] py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#5546C4]"
              >
                <Flame className="h-4 w-4" />
                <span>Launch Practice Arena</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
