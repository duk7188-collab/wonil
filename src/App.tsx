/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, Layout, Database, Settings as SettingsIcon, 
  Plus, Trash2, Save, LogOut, ExternalLink, Mail, Phone, MapPin,
  Instagram, Globe, Cpu, Layers, ShieldCheck, ArrowRight
} from 'lucide-react';
import { Post, Settings } from './types';

// --- Components ---

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 200 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="50" rx="95" ry="48" fill="#f47a20" />
    <text 
      x="50%" 
      y="55%" 
      dominantBaseline="middle" 
      textAnchor="middle" 
      fill="white" 
      fontSize="48" 
      fontWeight="900" 
      fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" 
      letterSpacing="1"
    >
      WONIL
    </text>
  </svg>
);

const Navbar = ({ onAdminClick }: { onAdminClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '홈', href: '#home' },
    { name: '서비스', href: '#services' },
    { name: '포트폴리오', href: '#portfolio' },
    { name: '문의하기', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter flex items-center gap-3"
        >
          <Logo className="w-16 h-8" />
          <span>원일<span className="text-brand-purple"> 인더스트리</span></span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-brand-purple transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={onAdminClick}
            className="p-2 rounded-full bg-white/5 hover:bg-brand-purple/20 transition-colors border border-white/10"
          >
            <SettingsIcon className="w-4 h-4 text-white/70" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-white/70 hover:text-brand-purple"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => { onAdminClick(); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-2 text-lg font-medium text-white/70 hover:text-brand-purple"
              >
                <SettingsIcon className="w-5 h-5" /> 관리자 설정
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-purple/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple-light text-xs font-bold tracking-widest uppercase mb-6">
            Premium Access Floor Components
          </span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
            공간의 가치를 높이는<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-purple">혁신적인 바닥재 솔루션</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            원일인더스트리는 20년 이상의 기술력을 바탕으로 고품질 이중바닥재 부품을 제조합니다. 
            안정성, 내구성, 그리고 디자인까지 완벽한 공간을 약속합니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#portfolio" className="w-full sm:w-auto px-8 py-4 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-full font-bold transition-all flex items-center justify-center gap-2 purple-glow">
              포트폴리오 보기 <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold transition-all">
              문의하기
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-brand-purple rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Cpu className="w-8 h-8 text-brand-purple" />,
      title: "정밀 부품 제조",
      desc: "최첨단 다이캐스팅 공법을 통해 오차 없는 정밀한 이중바닥재 부품을 생산합니다."
    },
    {
      icon: <Layers className="w-8 h-8 text-brand-purple" />,
      title: "시스템 설계 지원",
      desc: "현장 상황에 최적화된 바닥재 시스템 설계 및 기술 컨설팅 서비스를 제공합니다."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-purple" />,
      title: "품질 보증 시스템",
      desc: "엄격한 하중 테스트와 내구성 검증을 통과한 제품만을 공급하여 안전을 보장합니다."
    }
  ];

  return (
    <section id="services" className="py-24 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">우리의 서비스</h2>
          <div className="w-20 h-1 bg-brand-purple mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="glass-card p-10 purple-glow-hover transition-all"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-white/50 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = ({ posts }: { posts: Post[] }) => {
  return (
    <section id="portfolio" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">포트폴리오</h2>
            <p className="text-white/50">원일인더스트리의 주요 제품 및 시공 사례입니다.</p>
          </div>
          <div className="flex gap-4">
            <span className="text-brand-purple font-bold">All Projects</span>
            <span className="text-white/30">Products</span>
            <span className="text-white/30">Case Studies</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] glass-card"
            >
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="text-brand-purple-light text-xs font-bold uppercase tracking-widest mb-2">{post.category}</span>
                <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                <p className="text-white/60 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{post.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">함께 혁신을<br />만들어보세요</h2>
            <p className="text-white/50 mb-12 text-lg">
              제품 문의, 기술 지원, 대량 구매 등 궁금하신 점이 있다면 언제든 연락주세요. 
              전문 상담원이 친절하게 안내해 드립니다.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase font-bold tracking-widest">Email</p>
                  <p className="text-lg">contact@wonil.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase font-bold tracking-widest">Phone</p>
                  <p className="text-lg">02-1234-5678</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase font-bold tracking-widest">Office</p>
                  <p className="text-lg">경기도 안산시 단원구 산업단지로 123</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-12">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">이름</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-purple outline-none transition-colors" placeholder="홍길동" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">연락처</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-purple outline-none transition-colors" placeholder="010-0000-0000" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">이메일</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-purple outline-none transition-colors" placeholder="example@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">문의 내용</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-purple outline-none transition-colors resize-none" placeholder="문의하실 내용을 입력해주세요."></textarea>
              </div>
              <button className="w-full py-4 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-xl font-bold transition-all purple-glow">
                문의 보내기
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-3">
            <Logo className="w-12 h-6" />
            <span>원일<span className="text-brand-purple">인더스트리</span></span>
          </div>
          
          <div className="flex gap-8 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">이메일무단수집거부</a>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-purple/20 transition-colors border border-white/10">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-purple/20 transition-colors border border-white/10">
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-white/20">
          © 2026 원일인더스트리. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// --- Admin Dashboard ---

const AdminDashboard = ({ 
  posts, 
  onClose, 
  onAddPost, 
  onDeletePost 
}: { 
  posts: Post[], 
  onClose: () => void,
  onAddPost: (post: Omit<Post, 'id' | 'createdAt'>) => void,
  onDeletePost: (id: number) => void
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'settings'>('posts');
  const [newPost, setNewPost] = useState({ title: '', category: '제품소개', description: '', imageUrl: '' });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
    >
      <div className="w-full max-w-5xl h-full max-h-[800px] glass-card flex flex-col overflow-hidden border-brand-purple/30">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center">
              <SettingsIcon className="text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">관리자 대시보드</h2>
              <p className="text-xs text-white/40">웹사이트 콘텐츠 및 디자인 관리</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 border-r border-white/10 p-4 hidden md:block">
            <div className="space-y-2">
              <button 
                onClick={() => setActiveTab('posts')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'posts' ? 'bg-brand-purple text-white' : 'hover:bg-white/5 text-white/60'}`}
              >
                <Layout className="w-5 h-5" /> 게시글 관리
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-brand-purple text-white' : 'hover:bg-white/5 text-white/60'}`}
              >
                <SettingsIcon className="w-5 h-5" /> 디자인 설정
              </button>
            </div>
            <div className="mt-auto pt-4 border-t border-white/10">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all">
                <LogOut className="w-5 h-5" /> 로그아웃
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {activeTab === 'posts' ? (
              <div className="space-y-8">
                <div className="glass-card p-6 border-brand-purple/20 bg-brand-purple/5">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-brand-purple" /> 새 게시글 추가
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input 
                      type="text" 
                      placeholder="제목" 
                      className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-brand-purple"
                      value={newPost.title}
                      onChange={e => setNewPost({...newPost, title: e.target.value})}
                    />
                    <select 
                      className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-brand-purple"
                      value={newPost.category}
                      onChange={e => setNewPost({...newPost, category: e.target.value})}
                    >
                      <option>제품소개</option>
                      <option>시공사례</option>
                      <option>기술자료</option>
                    </select>
                  </div>
                  <input 
                    type="text" 
                    placeholder="이미지 URL (picsum.photos 등)" 
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 mb-4 outline-none focus:border-brand-purple"
                    value={newPost.imageUrl}
                    onChange={e => setNewPost({...newPost, imageUrl: e.target.value})}
                  />
                  <textarea 
                    placeholder="설명" 
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 mb-4 outline-none focus:border-brand-purple resize-none"
                    rows={3}
                    value={newPost.description}
                    onChange={e => setNewPost({...newPost, description: e.target.value})}
                  ></textarea>
                  <button 
                    onClick={() => {
                      if (newPost.title && newPost.imageUrl) {
                        onAddPost(newPost);
                        setNewPost({ title: '', category: '제품소개', description: '', imageUrl: '' });
                      }
                    }}
                    className="px-6 py-2 bg-brand-purple hover:bg-brand-purple-dark rounded-lg font-bold transition-all"
                  >
                    게시하기
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold">현재 게시글 목록 ({posts.length})</h3>
                  <div className="grid gap-4">
                    {posts.map(post => (
                      <div key={post.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                        <img src={post.imageUrl} className="w-16 h-16 rounded-lg object-cover" referrerPolicy="no-referrer" />
                        <div className="flex-1">
                          <h4 className="font-bold">{post.title}</h4>
                          <p className="text-xs text-white/40">{post.category} • {new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                        <button 
                          onClick={() => onDeletePost(post.id)}
                          className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <SettingsIcon className="w-5 h-5 text-brand-purple" /> 테마 및 기본 설정
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm text-white/60">포인트 색상 (Primary Color)</label>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-brand-purple border-2 border-white/20" />
                        <input type="text" defaultValue="#8b5cf6" className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 flex-1 outline-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/60">회사 이름</label>
                      <input type="text" defaultValue="원일인더스트리" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/60">메인 히어로 타이틀</label>
                      <input type="text" defaultValue="공간의 가치를 높이는 혁신적인 바닥재 솔루션" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 outline-none" />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-brand-purple hover:bg-brand-purple-dark rounded-lg font-bold transition-all">
                      <Save className="w-5 h-5" /> 설정 저장
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [settings, setSettings] = useState<Settings>({});
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [postsRes, settingsRes] = await Promise.all([
        fetch('/api/posts'),
        fetch('/api/settings')
      ]);
      const postsData = await postsRes.json();
      const settingsData = await settingsRes.json();
      setPosts(postsData);
      setSettings(settingsData);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddPost = async (newPost: Omit<Post, 'id' | 'createdAt'>) => {
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error('Failed to add post', err);
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error('Failed to delete post', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-12 h-12 bg-brand-purple rounded-xl"
        />
      </div>
    );
  }

  return (
    <div className="selection:bg-brand-purple/30">
      <Navbar onAdminClick={() => setIsAdminOpen(true)} />
      
      <main>
        <Hero />
        <Services />
        <Portfolio posts={posts} />
        <Contact />
      </main>

      <Footer />

      <AnimatePresence>
        {isAdminOpen && (
          <AdminDashboard 
            posts={posts} 
            onClose={() => setIsAdminOpen(false)} 
            onAddPost={handleAddPost}
            onDeletePost={handleDeletePost}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
