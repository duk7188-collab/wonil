/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, Layout, Database, Settings as SettingsIcon, 
  Plus, Trash2, Save, LogOut, ExternalLink, Mail, Phone, MapPin, Printer, Clock,
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
    { name: '회사소개', href: '#about' },
    { name: '사업 영역', href: '#portfolio' },
    { name: '문의하기', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-blue/90 backdrop-blur-md py-4 border-b border-white/10 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter flex items-center gap-3"
        >
          <Logo className="w-16 h-8" />
          <span>원일<span className="text-brand-orange"> 인더스트리</span></span>
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
            className="md:hidden bg-brand-blue border-b border-white/10 overflow-hidden"
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
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://tse2.mm.bing.net/th/id/OIP.FfZ7X81D0YrBi5hK7I20oAHaEG?rs=1&pid=ImgDetMain&o=7&rm=3" 
          alt="Wonil Access Floor System" 
          className="w-full h-full object-cover opacity-70 blur-none scale-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/60 via-brand-blue/30 to-brand-blue/60" />
      </div>

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
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1] drop-shadow-lg">
            공간의 가치를 높이는<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-purple">이중바닥재 부품 전문기업</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            ㈜원일인더스트리는 이중바닥재(Access Floor) 시스템의 핵심 부품을 전문적으로 생산하는 기업으로, 정밀 가공 기술과 품질 중심 경영을 바탕으로 국내외 건설 및 클린룸, 데이터센터, 반도체 산업에 최적의 솔루션을 제공하고 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#portfolio" className="w-full sm:w-auto px-8 py-4 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-full font-bold transition-all flex items-center justify-center gap-2 purple-glow">
              사업 영역 <ChevronRight className="w-4 h-4" />
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

const CompanyIntro = () => {
  const history = [
    { year: "2026", event: "AI 데이터센터 전용 내진용, 고하중 이중바닥재 부품 개발" },
    { year: "2025", event: "기술평가 우수기업 인증서 획득" },
    { year: "2025", event: "내진 성능이 개선된 액세스 플로어 구조 특허출원" },
    { year: "2025", event: "㈜원일인더스트리 법인 설립 및 공장 확장 이전" },
    { year: "2024", event: "AI 데이터센터 전용 고하중 이중바닥재 부품 개발" },
    { year: "2020", event: "스마트 팩토리 생산 라인 자동화 구축" },
    { year: "2015", event: "해외 수출 500만불 달성 및 글로벌 파트너십 체결" },
    { year: "2014", event: "ISO9001, ISO14001 인증 획득" },
    { year: "2009", event: "신월성 원자력 1호기 현장 납품" },
    { year: "2008", event: "10월 원일산업 설립" },
  ];

  const certs = [
    { title: "기술평가 우수기업", desc: "NICE평가정보 기술역량 우수기업 인증" },
    { title: "ISO 9001", desc: "품질경영시스템 인증" },
    { title: "ISO 14001", desc: "환경경영시스템 인증" },
    { title: "KS 인증", desc: "한국산업표준 제품 인증" },
    { title: "이노비즈", desc: "기술혁신형 중소기업 인증" },
  ];

  return (
    <section id="about" className="py-24 bg-brand-blue-dark/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">회사 소개</h2>
          <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full" />
        </div>

        <div className="space-y-24">
          {/* CEO Message */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[8/5] rounded-3xl overflow-hidden glass-card"
            >
              <img 
                src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202205/20/1687d98d-3d2d-41d4-bcd0-5256ead91786.jpg" 
                alt="CEO" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-transparent to-transparent" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-brand-orange">CEO 인사말</h3>
              <p className="text-xl text-white/80 leading-relaxed italic">
                "정밀함이 만드는 안전, 기술이 만드는 미래"
              </p>
              <p className="text-white/60 leading-relaxed">
                안녕하십니까. ㈜원일인더스트리 홈페이지를 찾아주신 여러분을 진심으로 환영합니다.<br /><br />
                저희는 창립 이래 이중바닥재 부품 분야에서 오직 한 길만을 걸어오며, 보이지 않는 곳에서 공간의 안전과 가치를 지탱해왔습니다. 
                급변하는 산업 환경 속에서도 변치 않는 품질과 혁신적인 기술력으로 고객 여러분의 신뢰에 보답하겠습니다.<br /><br />
                단순한 부품 제조를 넘어, 인류의 삶을 담는 공간의 기초를 더욱 단단히 다지는 기업이 될 것을 약속드립니다.
              </p>
            </motion.div>
          </div>

          {/* Detailed History */}
          <div className="space-y-12">
            <h3 className="text-3xl font-bold text-center">상세 연혁</h3>
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-white/10 hidden md:block" />
              <div className="space-y-12">
                {history.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className="flex-1 text-center md:text-right">
                      {idx % 2 === 0 ? (
                        <div className="md:pr-12">
                          <span className="text-4xl font-black text-brand-orange/20 block mb-2">{item.year}</span>
                          <p className="text-lg font-bold">{item.event}</p>
                        </div>
                      ) : null}
                    </div>
                    <div className="w-4 h-4 rounded-full bg-brand-orange relative z-10 shadow-[0_0_15px_rgba(244,122,32,0.5)]" />
                    <div className="flex-1 text-center md:text-left">
                      {idx % 2 !== 0 ? (
                        <div className="md:pl-12">
                          <span className="text-4xl font-black text-brand-orange/20 block mb-2">{item.year}</span>
                          <p className="text-lg font-bold">{item.event}</p>
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Certification Status */}
          <div className="space-y-12">
            <h3 className="text-3xl font-bold text-center">인증서 현황</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certs.map((cert, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="glass-card p-8 text-center border-brand-orange/10 hover:border-brand-orange/30 transition-all"
                >
                  <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="text-brand-orange w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{cert.title}</h4>
                  <p className="text-xs text-white/40">{cert.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = ({ posts }: { posts: Post[] }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = ['전체', '제품소개', '시공사례', '기술자료'];

  const filteredPosts = selectedCategory === '전체' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">사업 영역</h2>
            <p className="text-white/50">원일인더스트리의 주요 제품 및 시공 사례입니다.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-brand-orange text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const CardContent = (
                <>
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform">
                    <span className="text-brand-orange text-sm font-black uppercase tracking-widest mb-2">{post.category}</span>
                    <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                    <p className="text-white/60 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{post.description}</p>
                  </div>
                </>
              );

              return (
                <motion.div
                  key={post.id}
                  onClick={() => navigate(`/product/${post.id}`)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] glass-card cursor-pointer"
                >
                  {CardContent}
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center glass-card border-dashed border-white/10">
              <p className="text-white/40 italic">'{selectedCategory}' 카테고리에 등록된 데이터가 없습니다.</p>
            </div>
          )}
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
                  <p className="text-lg">wonil02452@naver.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase font-bold tracking-widest">Phone</p>
                  <p className="text-lg">031-355-0761</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase font-bold tracking-widest">Fax</p>
                  <p className="text-lg">031-355-0762</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase font-bold tracking-widest">Office</p>
                  <p className="text-lg">경기도 화성시 주석로80번길 18-14</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-12 flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 rounded-3xl bg-brand-purple/20 flex items-center justify-center text-brand-purple mb-8">
              <Mail className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4">이메일로 문의하기</h3>
            <p className="text-white/60 mb-8 max-w-sm">
              클릭하시면 메일 앱이 실행되어<br />
              원일인더스트리 담당자에게 바로 메일을 보낼 수 있습니다.
            </p>
            <a 
              href="mailto:wonil02452@naver.com"
              className="w-full py-5 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-2xl font-bold transition-all purple-glow flex items-center justify-center gap-3 text-lg"
            >
              <Mail className="w-5 h-5" />
              wonil02452@naver.com
            </a>
            <p className="mt-6 text-sm text-white/30">
              보통 24시간 이내에 답변을 드립니다.
            </p>
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
            <span>원일<span className="text-brand-orange"> 인더스트리</span></span>
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
  onDeletePost,
  onRestoreDefaults
}: { 
  posts: Post[], 
  onClose: () => void,
  onAddPost: (post: Omit<Post, 'id' | 'createdAt'>) => void,
  onDeletePost: (id: number) => void,
  onRestoreDefaults: () => void
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'settings'>('posts');
  const [newPost, setNewPost] = useState({ title: '', category: '제품소개', description: '', imageUrl: '', linkUrl: '' });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-brand-blue/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
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
                <Layout className="w-5 h-5" /> 제품 관리
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
                    <Plus className="w-5 h-5 text-brand-purple" /> 새 제품 추가
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input 
                      type="text" 
                      placeholder="제목" 
                      className="bg-brand-blue-dark/40 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-brand-purple"
                      value={newPost.title}
                      onChange={e => setNewPost({...newPost, title: e.target.value})}
                    />
                    <select 
                      className="bg-brand-blue-dark/40 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-brand-purple"
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
                    className="w-full bg-brand-blue-dark/40 border border-white/10 rounded-lg px-4 py-2 mb-4 outline-none focus:border-brand-purple"
                    value={newPost.imageUrl}
                    onChange={e => setNewPost({...newPost, imageUrl: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="링크 URL (선택 사항)" 
                    className="w-full bg-brand-blue-dark/40 border border-white/10 rounded-lg px-4 py-2 mb-4 outline-none focus:border-brand-purple"
                    value={newPost.linkUrl}
                    onChange={e => setNewPost({...newPost, linkUrl: e.target.value})}
                  />
                  <textarea 
                    placeholder="설명" 
                    className="w-full bg-brand-blue-dark/40 border border-white/10 rounded-lg px-4 py-2 mb-4 outline-none focus:border-brand-purple resize-none"
                    rows={3}
                    value={newPost.description}
                    onChange={e => setNewPost({...newPost, description: e.target.value})}
                  ></textarea>
                  <button 
                    onClick={() => {
                      if (newPost.title && newPost.imageUrl) {
                        onAddPost(newPost);
                        setNewPost({ title: '', category: '제품소개', description: '', imageUrl: '', linkUrl: '' });
                      }
                    }}
                    className="px-6 py-2 bg-brand-purple hover:bg-brand-purple-dark rounded-lg font-bold transition-all"
                  >
                    게시하기
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">현재 제품 목록 ({posts.length})</h3>
                    {posts.length === 0 && (
                      <button 
                        onClick={onRestoreDefaults}
                        className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-all border border-white/10"
                      >
                        기본 데이터 복구
                      </button>
                    )}
                  </div>
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
                      <input type="text" defaultValue="원일인더스트리" className="w-full bg-brand-blue-dark/40 border border-white/10 rounded-lg px-4 py-2 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/60">메인 히어로 타이틀</label>
                      <input type="text" defaultValue="공간의 가치를 높이는 이중바닥재 부품 전문기업" className="w-full bg-brand-blue-dark/40 border border-white/10 rounded-lg px-4 py-2 outline-none" />
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

// --- Product Detail Page ---

const ProductDetail = ({ posts }: { posts: Post[] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-brand-blue flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-4xl font-bold mb-4">제품을 찾을 수 없습니다.</h2>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-brand-purple rounded-xl font-bold hover:bg-brand-purple-dark transition-all"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-blue pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/60 hover:text-brand-orange mb-8 transition-colors group"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform" /> 뒤로 가기
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl overflow-hidden glass-card aspect-square"
          >
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block px-4 py-1 bg-brand-orange/20 text-brand-orange rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
              <div className="h-1 w-20 bg-brand-orange rounded-full mb-8" />
              <p className="text-xl text-white/70 leading-relaxed whitespace-pre-wrap">
                {post.description}
              </p>
            </div>

            <div className="p-8 glass-card border-brand-orange/20 bg-brand-orange/5 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="text-brand-orange" /> 주요 특장점
              </h3>
              <ul className="space-y-4">
                {[
                  "최고급 소재 사용으로 내구성 극대화",
                  "정밀 설계를 통한 완벽한 수평 유지",
                  "다양한 산업 현장 맞춤형 솔루션 제공",
                  "철저한 품질 관리 및 유지보수 지원"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {post.linkUrl && (
              <a 
                href={post.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-2xl font-bold transition-all purple-glow flex items-center justify-center gap-3 text-lg"
              >
                공식 홈페이지에서 보기 <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
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

  const handleRestoreDefaults = async () => {
    try {
      const res = await fetch('/api/posts/seed', { method: 'POST' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error('Failed to restore defaults', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-blue flex items-center justify-center">
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
      
      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <CompanyIntro />
            <Portfolio posts={posts} />
            <Contact />
          </main>
        } />
        <Route path="/product/:id" element={<ProductDetail posts={posts} />} />
      </Routes>

      <Footer />

      <AnimatePresence>
        {isAdminOpen && (
          <AdminDashboard 
            posts={posts} 
            onClose={() => setIsAdminOpen(false)} 
            onAddPost={handleAddPost}
            onDeletePost={handleDeletePost}
            onRestoreDefaults={handleRestoreDefaults}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
