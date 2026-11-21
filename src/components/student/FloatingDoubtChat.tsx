import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { sendDoubtChat } from '../../services/api';
import { DoubtChatMessage } from '../../types';
import { extractPdfText, MAX_PDF_BYTES } from '../../services/pdf';
import {
  MessageCircle,
  X,
  Send,
  FileText,
  Sparkles,
  Paperclip,
  Trash2,
  Maximize2,
  Minimize2,
  Bot,
  User,
  ArrowRight
} from 'lucide-react';

export const FloatingDoubtChat: React.FC = () => {
  const { selectedConcept, showToast } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<DoubtChatMessage[]>([
    {
      id: 'init_1',
      sender: 'ai',
      text: `Hello Alex! I'm your LearnLoop AI tutor. I notice you're working on **${selectedConcept.name}**.\n\nStuck on a calculation, physical concept, or tricky circuit diagram? Ask anything, or upload a photo of your textbook question!`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [pdf, setPdf] = useState<{ name: string; text: string; pages: number } | null>(null);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Quick Suggestion Prompts
  const quickPrompts = [
    'Explain this in simple words.',
    'Give me a real-world example.',
    'Help me solve this step by step.',
    "Why is current inversely related to resistance?"
  ];

  const handlePdfSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showToast('Please upload a PDF file.', 'error');
      return;
    }
    if (file.size > MAX_PDF_BYTES) {
      showToast('PDF must be under 10MB.', 'warning');
      return;
    }
    setPdfBusy(true);
    try {
      const { text, pages } = await extractPdfText(file);
      if (text.length < 20) {
        showToast('No readable text found. Scanned PDFs are not supported; try a text-based PDF.', 'warning');
        return;
      }
      setPdf({ name: file.name, text, pages });
      showToast(`Read ${pages} page(s). Type your doubt and press Send.`, 'info');
    } catch {
      showToast('Could not read this PDF. It may be corrupted or password-protected.', 'error');
    } finally {
      setPdfBusy(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const content = (textToSend || inputText).trim();
    if (!content && !pdf) return;

    const userMsg: DoubtChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'student',
      text: content || 'Please explain this document.',
      pdfName: pdf?.name,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    const currentPdf = pdf;
    setIsTyping(true);

    try {
      const reply = await sendDoubtChat(
        [...messages, userMsg],
        selectedConcept,
        currentPdf ? { name: currentPdf.name, text: currentPdf.text } : undefined
      );

      const aiMsg: DoubtChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      showToast('Error getting AI reply: ' + err.message, 'error');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button (Fixed Bottom-Right) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 rounded-full bg-[#6658D3] px-4 py-3 text-xs font-bold text-white shadow-float-btn transition-all duration-200 hover:scale-105 hover:bg-[#5546C4] active:scale-95"
          aria-label="Ask LearnLoop AI a doubt"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="hidden sm:inline">Ask a Doubt</span>
          <span className="h-2 w-2 rounded-full bg-[#159B85] animate-pulse" />
        </button>
      )}

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div
          className={`fixed z-50 flex flex-col rounded-card border border-[#E2E6F0] bg-white shadow-popover transition-all duration-200 ${
            isExpanded
              ? 'bottom-6 right-6 w-[92vw] max-w-2xl h-[82vh]'
              : 'bottom-6 right-6 w-[94vw] max-w-md h-[560px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E2E6F0] bg-[#17213D] p-3.5 rounded-t-card text-white">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#6658D3]">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-heading text-xs font-bold">Ask LearnLoop AI</h3>
                  <span className="rounded bg-[#159B85]/20 px-1.5 py-0.2 text-[9px] font-bold text-[#A3E8DC]">
                    PDF Enabled
                  </span>
                </div>
                <p className="text-[10px] text-gray-300">
                  Context: <span className="text-[#A99CF7] font-semibold">{selectedConcept.name}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="rounded p-1 text-gray-400 hover:text-white"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-1 text-gray-400 hover:text-white"
                title="Close Chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel Bar */}
          <div className="flex items-center space-x-1.5 overflow-x-auto border-b border-[#E2E6F0] bg-[#F7F8FC] p-2 text-[11px]">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap rounded-full border border-[#E2E6F0] bg-white px-2.5 py-1 text-xs text-gray-700 transition-colors hover:border-[#6658D3] hover:text-[#6658D3]"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map(msg => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-2 ${
                    isAi ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {isAi && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EEECFC] text-[#6658D3] mt-0.5">
                      <Sparkles className="h-3 w-3" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl p-3 leading-relaxed ${
                      isAi
                        ? 'border border-[#E2E6F0] bg-[#F7F8FC] text-[#17213D]'
                        : 'bg-[#6658D3] text-white shadow-sm'
                    }`}
                  >
                    {msg.pdfName && (
                      <div className="mb-2 flex items-center space-x-1.5 rounded-lg bg-black/10 px-2 py-1 text-[10px] font-semibold">
                        <FileText className="h-3 w-3" />
                        <span className="truncate">{msg.pdfName}</span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    <span
                      className={`mt-1 block text-[9px] ${
                        isAi ? 'text-gray-400' : 'text-white/70'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {!isAi && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#17213D] text-white mt-0.5">
                      <User className="h-3 w-3" />
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EEECFC] text-[#6658D3]">
                  <Sparkles className="h-3 w-3 animate-spin" />
                </div>
                <div className="rounded-2xl border border-[#E2E6F0] bg-[#F7F8FC] px-3 py-2 text-[11px]">
                  LearnLoop AI is reasoning step by step...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {pdf && (
            <div className="flex items-center justify-between border-t border-[#E2E6F0] bg-[#F4F3FD] px-3 py-1.5 text-xs">
              <div className="flex min-w-0 items-center space-x-2">
                <FileText className="h-4 w-4 shrink-0 text-[#6658D3]" />
                <span className="truncate text-[11px] font-semibold text-[#6658D3]">
                  {pdf.name} · {pdf.pages} page(s) attached
                </span>
              </div>
              <button onClick={() => setPdf(null)} className="rounded p-1 text-gray-400 hover:text-[#E16D78]" title="Remove PDF">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Input Composer */}
          <div className="border-t border-[#E2E6F0] p-3 bg-white rounded-b-card">
            <div className="flex items-center space-x-2">
              {/* PDF Upload Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-btn p-2 text-gray-500 hover:bg-[#EEF0F7] hover:text-[#6658D3]"
                title="Attach a PDF (notes, worksheet, textbook chapter)" disabled={pdfBusy}
              >
                <FileText className={`h-4 w-4 ${pdfBusy ? 'animate-pulse' : ''}`} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={handlePdfSelect}
                className="hidden"
              />

              <input
                type="text"
                placeholder="Ask a doubt or ask about an attached PDF..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                disabled={isTyping}
                className="flex-1 rounded-btn border border-[#E2E6F0] bg-[#F7F8FC] py-2 px-3 text-xs text-[#17213D] focus:border-[#6658D3] focus:bg-white focus:outline-none"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={(!inputText.trim() && !pdf) || isTyping || pdfBusy}
                className="flex h-8 w-8 items-center justify-center rounded-btn bg-[#6658D3] text-white shadow-sm hover:bg-[#5546C4] disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
