import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center animate-glow">
                <Icon name="Radio" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="font-heading font-bold text-2xl gradient-text">POPFM</h1>
                <p className="text-xs text-muted-foreground">Биробиджан</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {['Главная', 'Прямой эфир', 'О станции', 'Реклама', 'Контакты'].map((item, idx) => {
                const id = ['home', 'live', 'about', 'ads', 'contacts'][idx];
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(id)}
                    className={`text-sm font-medium transition-all hover:text-primary ${
                      activeSection === id ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <Button 
                onClick={() => scrollToSection('live')}
                className="hidden sm:flex gradient-bg hover:opacity-90 transition-opacity"
              >
                <Icon name="Play" size={16} className="mr-2" />
                Слушать
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-background/95 border-b border-border animate-fade-in">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {['Главная', 'Прямой эфир', 'О станции', 'Реклама', 'Контакты'].map((item, idx) => {
                const id = ['home', 'live', 'about', 'ads', 'contacts'][idx];
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                      activeSection === id 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
              
              <Button 
                onClick={() => scrollToSection('live')}
                className="w-full gradient-bg hover:opacity-90 transition-opacity"
              >
                <Icon name="Play" size={16} className="mr-2" />
                Слушать радио
              </Button>
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 animate-pulse opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(155,135,245,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center fade-on-scroll">
            <div className="inline-block mb-6 px-6 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm animate-scale-in">
              <span className="text-sm font-medium text-primary">🎵 В эфире круглосуточно</span>
            </div>
            
            <h2 className="font-heading font-bold text-6xl md:text-8xl mb-6 gradient-text animate-slide-up">
              POPFM
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Твоя любимая музыка в Биробиджане
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg" 
                onClick={() => scrollToSection('live')}
                className="gradient-bg hover:opacity-90 transition-all text-lg px-8 py-6 hover:scale-105"
              >
                <Icon name="Play" size={20} className="mr-2" />
                Включить радио
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('about')}
                className="border-primary/30 hover:bg-primary/10 text-lg px-8 py-6 hover:scale-105 transition-all"
              >
                Узнать больше
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { icon: 'Music', label: 'Хиты дня', value: '24/7' },
                { icon: 'Users', label: 'Слушателей', value: '10K+' },
                { icon: 'Mic', label: 'Ведущих', value: '8' }
              ].map((stat, idx) => (
                <div key={stat.label} className="fade-on-scroll" style={{ animationDelay: `${0.6 + idx * 0.1}s` }}>
                  <Icon name={stat.icon as any} className="text-primary mx-auto mb-2" size={32} />
                  <div className="text-2xl font-bold font-heading">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="live" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="font-heading font-bold text-4xl md:text-5xl text-center mb-12 fade-on-scroll">
              <span className="gradient-text">Прямой эфир</span>
            </h3>
            
            <Card className="gradient-border p-8 md:p-12 backdrop-blur-xl bg-card/50 fade-on-scroll">
              <div className="flex flex-col items-center gap-8">
                <div 
                  id="sc-player" 
                  className="w-full max-w-[870px]"
                  dangerouslySetInnerHTML={{
                    __html: `
                      <div
                        is="player"
                        lang="ru" 
                        api-url="https://stream.popfm-bir.ru:1030/api/v2"
                        server-id="1"
                        station-name="POPFM Биробиджан"
                        station-url="https://popfm-bir.ru/"
                        imagecontainer="right"
                        imagecontainer-bg="#e8e8e8"
                        imagecontainer-bg-opacity="0"
                        controlscontainer="top"
                        controlscontainer-bg="#d6d6d6"
                        controlscontainer-bg-opacity="0"
                        controlscontainer-bg-img=""
                        historycontainer="top"
                        historycontainer-bg="#b6deec"
                        historycontainer-bg-opacity="0"
                        show-history="true"
                        history-limit="30"
                        sharecontainer="both"
                        sharecontainer-bg="#ffffff"
                        sharecontainer-bg-opacity="1"
                        show-share="false"
                        share-url=""
                        share="[]"
                        show-dj="false"
                        default-dj-img="https://stream.popfm-bir.ru:1030/media/djs/dj.png"
                        show-image="true"
                        default-cover-image="https://stream.popfm-bir.ru:1030/media/widgets/019b3e44-bb20-7111-9491-0bbb7544fb5b_vYeOYP7.png"
                        play-button-color="#526098"
                        play-button-bg="null"
                        visualizer-outline-color="#37679a"
                        visualizer-bar-width="1"
                        channels-displayed="[1,11,20,29]"
                        channels-switch-bg="#f7f7f7"
                        channels-switch-color="#788ab5"
                        channels-switch-bg-active="#aca8e1"
                        channels-switch-color-active="#000000"
                        show-vote="false"
                        vote-buttons-color="#dce3ea"
                        vote-buttons-opacity="1"
                        vote-results-font-color="#FFFFFF"
                        vote-results-font-size="15"
                        progress-show="true"
                        progress-bar-color="#ffffff"
                        progress-bar-bg-color="#41b883"
                        progress-bar-bg-opacity="0"
                        progress-bar-bg-height="100"
                        progress-bar-opacity="0.2"
                        progress-font-color="#FFFFFF"
                        progress-font-size="20"
                        progress-bar-bg-radius="4"
                        progress-bar-bg-border="#F5F5F5"
                        player-width="870px"
                      >
                      </div>
                    `
                  }}
                />
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="font-heading font-bold text-4xl md:text-5xl text-center mb-16 fade-on-scroll">
            <span className="gradient-text">О станции</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: 'Sparkles',
                title: 'Лучшая музыка',
                description: 'Самые свежие хиты и любимая классика в одном эфире. Только проверенные треки, которые поднимают настроение.'
              },
              {
                icon: 'Clock',
                title: '24/7 в эфире',
                description: 'Мы вещаем круглосуточно без перерывов. Включай POPFM в любое время дня и ночи.'
              },
              {
                icon: 'Heart',
                title: 'Для всей семьи',
                description: 'Музыка для разных поколений и вкусов. От современных треков до золотых хитов прошлых лет.'
              },
              {
                icon: 'Zap',
                title: 'Живое общение',
                description: 'Наши ведущие всегда на связи. Оставляй заявки, участвуй в конкурсах и выигрывай призы!'
              }
            ].map((feature, idx) => (
              <Card key={feature.title} className="p-8 hover:scale-105 transition-transform cursor-pointer backdrop-blur-sm bg-card/80 fade-on-scroll" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6">
                  <Icon name={feature.icon as any} className="text-white" size={32} />
                </div>
                <h4 className="font-heading font-bold text-2xl mb-4">{feature.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="ads" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-heading font-bold text-4xl md:text-5xl mb-8 fade-on-scroll">
              <span className="gradient-text">Реклама на POPFM</span>
            </h3>
            
            <p className="text-xl text-muted-foreground mb-12 fade-on-scroll">
              Размещайте рекламу на самой популярной радиостанции Биробиджана
            </p>

            <Card className="gradient-border p-8 md:p-12 backdrop-blur-sm bg-card/80 fade-on-scroll">
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  { icon: 'Target', title: 'Целевая аудитория', value: '10 000+' },
                  { icon: 'TrendingUp', title: 'Охват города', value: '80%' },
                  { icon: 'Award', title: 'Лет в эфире', value: '15+' }
                ].map((stat) => (
                  <div key={stat.title} className="text-center">
                    <Icon name={stat.icon as any} className="text-primary mx-auto mb-4" size={40} />
                    <div className="text-3xl font-bold font-heading mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.title}</div>
                  </div>
                ))}
              </div>

              <Button 
                size="lg"
                className="gradient-bg hover:opacity-90 transition-all px-12 hover:scale-105"
                onClick={() => scrollToSection('contacts')}
              >
                <Icon name="Phone" size={20} className="mr-2" />
                Заказать рекламу
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading font-bold text-4xl md:text-5xl mb-8 fade-on-scroll">
              <span className="gradient-text">Контакты</span>
            </h3>
            
            <Card className="p-8 md:p-12 backdrop-blur-sm bg-card/80 fade-on-scroll">
              <div className="space-y-6">
                {[
                  { icon: 'Phone', label: 'Телефон', value: '+7 (42622) 2-XX-XX' },
                  { icon: 'Mail', label: 'Email', value: 'info@popfm-birobidzhan.ru' },
                  { icon: 'MapPin', label: 'Адрес', value: 'г. Биробиджан, ул. Ленина, 1' },
                  { icon: 'Clock', label: 'Работаем', value: '24/7 в эфире' }
                ].map((contact) => (
                  <div key={contact.label} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                      <Icon name={contact.icon as any} className="text-white" size={20} />
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-sm text-muted-foreground">{contact.label}</div>
                      <div className="font-medium">{contact.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 justify-center mt-8">
                {['Instagram', 'Facebook', 'Youtube'].map((social) => (
                  <Button
                    key={social}
                    variant="outline"
                    size="icon"
                    className="w-12 h-12 rounded-full border-primary/30 hover:bg-primary/10 hover:scale-110 transition-all"
                  >
                    <Icon name={social as any} size={20} />
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 POPFM Биробиджан. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;