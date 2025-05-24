'use client';

import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function Home() {
  useEffect(() => {
    // Make sure we're running on the client side
    if (typeof window === 'undefined') return;
    
    // Define handlers at the top level so they're accessible in the cleanup function
    type EventHandlerPair = { element: Element; handler: EventListener };
    const linkClickHandlers: EventHandlerPair[] = [];
    const scrollHandlers: EventHandlerPair[] = [];
    let handleMenuOpen: (() => void) | undefined;
    let handleMenuClose: (() => void) | undefined;
    
    // Mobile Menu Functionality
    const menuButton = document.getElementById('menu-button');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && closeMenu && mobileMenu) {
      // Create proper handler functions that we can reference for cleanup
      handleMenuOpen = () => {
        mobileMenu.classList.add('active');
      };
      
      handleMenuClose = () => {
        mobileMenu.classList.remove('active');
      };
      
      menuButton.addEventListener('click', handleMenuOpen);
      closeMenu.addEventListener('click', handleMenuClose);
      
      // Close menu when clicking a link
      const mobileMenuLinks = mobileMenu.querySelectorAll('a');
      
      mobileMenuLinks.forEach(link => {
        const handler = () => {
          mobileMenu.classList.remove('active');
        };
        link.addEventListener('click', handler);
        linkClickHandlers.push({ element: link, handler });
      });
    }

    // Smooth scrolling for all anchor links
    const anchorElements = document.querySelectorAll('a[href^="#"]');
    
    anchorElements.forEach(anchor => {
      const scrollHandler = function(this: HTMLAnchorElement, e: Event) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (!href) return;
        
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      };
      
      anchor.addEventListener('click', scrollHandler as EventListener);
      scrollHandlers.push({ element: anchor, handler: scrollHandler as EventListener });
    });

    // Cleanup event listeners on component unmount
    return () => {
      if (menuButton && closeMenu && handleMenuOpen && handleMenuClose) {
        // Remove event listeners to prevent memory leaks
        menuButton.removeEventListener('click', handleMenuOpen);
        closeMenu.removeEventListener('click', handleMenuClose);
      }
      
      // Remove all link click handlers
      linkClickHandlers.forEach(({ element, handler }: EventHandlerPair) => {
        element.removeEventListener('click', handler);
      });
      
      // Remove all scroll handlers
      scrollHandlers.forEach(({ element, handler }: EventHandlerPair) => {
        element.removeEventListener('click', handler);
      });
    };
  }, []);

  return (
    <div lang="ar" dir="rtl" className="overflow-x-hidden" suppressHydrationWarning>
      {/* Next.js App Router handles Head metadata differently */}
      {/* Head metadata should be placed in layout.tsx */}
      
      <Script src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap" rel="stylesheet" />
      
      <style jsx global>{`
        body {
            font-family: 'Tajawal', sans-serif;
            background-color: #FFFFFF;
            color: #212121;
        }
        
        .hero-section {
            background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1920&auto=format&fit=crop');
            background-size: cover;
            background-position: center;
            height: 95vh;
        }
        
        .primary-color {
            color: #C09F73;
        }
        
        .primary-bg {
            background-color: #C09F73;
        }
        
        .secondary-color {
            color: #212121;
        }
        
        .accent-color {
            color: #D4AF7A;
        }
        
        .light-bg {
            background-color: #F7F7F7;
        }
        
        .whatsapp-btn {
            transition: all 0.3s ease;
        }
        
        .whatsapp-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .service-card {
            transition: all 0.3s ease;
        }
        
        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(192, 159, 115, 0.2);
        }
        
        .step-number {
            background-color: #C09F73;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.25rem;
        }
        
        .mobile-menu {
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
        }
        
        .mobile-menu.active {
            transform: translateX(0);
        }
        
        .gallery-image {
            transition: all 0.3s ease;
        }
        
        .gallery-image:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      
      {/* Header/Navigation */}
      <header className="fixed top-0 right-0 left-0 bg-white bg-opacity-95 shadow-sm z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="#" className="flex items-center">
            <span className="font-bold text-2xl md:text-3xl secondary-color">قاصرات الطرف</span>
          </a>
          <nav className="hidden md:flex space-x-2 space-x-reverse">
            <a href="#about" className="secondary-color hover:primary-color font-medium transition duration-300 px-4">عن المصممة</a>
            <a href="#services" className="secondary-color hover:primary-color font-medium transition duration-300 px-4">خدماتنا</a>
            <a href="#process" className="secondary-color hover:primary-color font-medium transition duration-300 px-4">مراحل العمل</a>
            <a href="#gallery" className="secondary-color hover:primary-color font-medium transition duration-300 px-4">معرض الأعمال</a>
            <a href="#testimonials" className="secondary-color hover:primary-color font-medium transition duration-300 px-4">آراء العملاء</a>
            <a href="#contact" className="secondary-color hover:primary-color font-medium transition duration-300 px-4">اتصل بنا</a>
          </nav>
          <a href="https://wa.me/96598810169?text=مرحباً،%20أرغب%20في%20معرفة%20المزيد%20عن%20خدمات%20تصميم%20الأزياء%20لديكم" className="hidden md:flex primary-bg hover:bg-opacity-90 text-white font-medium px-5 py-2 rounded-full shadow transition duration-300 whatsapp-btn">
            <i className="fab fa-whatsapp ml-2"></i>تواصل معنا
          </a>
          <button className="md:hidden focus:outline-none secondary-color" id="menu-button">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
        {/* Mobile Menu */}
        <div className="mobile-menu fixed top-0 right-0 h-full w-4/5 bg-white z-50 shadow-lg p-5" id="mobile-menu">
          <div className="flex justify-between items-center mb-10">
            <span className="font-bold text-xl secondary-color">قاصرات الطرف</span>
            <button className="focus:outline-none" id="close-menu">
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>
          <nav className="flex flex-col space-y-4">
            <a href="#about" className="secondary-color hover:primary-color font-medium transition duration-300 px-4 py-2 border-r-4 border-transparent hover:border-primary-color">عن المصممة</a>
            <a href="#services" className="secondary-color hover:primary-color font-medium transition duration-300 px-4 py-2 border-r-4 border-transparent hover:border-primary-color">خدماتنا</a>
            <a href="#process" className="secondary-color hover:primary-color font-medium transition duration-300 px-4 py-2 border-r-4 border-transparent hover:border-primary-color">مراحل العمل</a>
            <a href="#gallery" className="secondary-color hover:primary-color font-medium transition duration-300 px-4 py-2 border-r-4 border-transparent hover:border-primary-color">معرض الأعمال</a>
            <a href="#testimonials" className="secondary-color hover:primary-color font-medium transition duration-300 px-4 py-2 border-r-4 border-transparent hover:border-primary-color">آراء العملاء</a>
            <a href="#contact" className="secondary-color hover:primary-color font-medium transition duration-300 px-4 py-2 border-r-4 border-transparent hover:border-primary-color">اتصل بنا</a>
            <a href="https://wa.me/96598810169?text=مرحباً،%20أرغب%20في%20معرفة%20المزيد%20عن%20خدمات%20تصميم%20الأزياء%20لديكم" className="mt-6 primary-bg hover:bg-opacity-90 text-white font-medium px-5 py-3 rounded-full shadow transition duration-300 text-center whatsapp-btn">
              <i className="fab fa-whatsapp ml-2"></i>تواصل معنا
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section flex items-center justify-center text-center text-white" id="home">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">تصميم أزياء مخصص <br />حسب الطلب</h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto mb-10">ترتقي بالأزياء الكويتية من خلال تصاميم مخصصة تناسب أسلوبك الفريد</p>
          <a href="https://wa.me/96598810169?text=مرحباً،%20أرغب%20في%20معرفة%20المزيد%20عن%20خدمات%20تصميم%20الأزياء%20لديكم" className="inline-flex items-center primary-bg hover:bg-opacity-90 text-white font-medium px-8 py-3 rounded-full shadow-lg text-lg transition duration-300 whatsapp-btn">
            <i className="fab fa-whatsapp ml-2 text-2xl"></i>
            ابدأي رحلة أزيائك الخاصة
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 light-bg" id="about">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pl-10">
              <h2 className="text-3xl md:text-4xl font-bold secondary-color mb-6">عن المصممة آسيا الويس</h2>
              <p className="text-lg mb-6">آسيا الويس هي مصممة أزياء كويتية رائدة، متخصصة في تصميم فساتين سهرة ومناسبات خاصة عالية الجودة ومخصصة للعملاء الذين يقدرون الحصرية والأناقة.</p>
              <p className="text-lg mb-8">تأسس أتيليه قاصرات الطرف بشغف للتصميم وسنوات من الخبرة في صناعة الأزياء الفاخرة، نحول أحلام الأزياء الخاصة بك إلى حقيقة من خلال الاهتمام الدقيق بالتفاصيل والحرفية الاستثنائية.</p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <img src="/asia1.webp" alt="رسم تصميم أزياء" className="rounded-lg shadow-lg object-cover w-full h-64" />
              <img src="/asia3.webp" alt="اختيار الأقمشة" className="rounded-lg shadow-lg object-cover w-full h-64" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold secondary-color mb-4">خدماتنا</h2>
            <p className="text-lg max-w-2xl mx-auto">نقدم مجموعة شاملة من خدمات تصميم الأزياء مصممة خصيصًا لتناسب أسلوبك وتفضيلاتك الشخصية.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="service-card bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex justify-center mb-6">
                  <i className="fas fa-pencil-ruler text-5xl primary-color"></i>
                </div>
                <h3 className="text-2xl font-bold text-center secondary-color mb-4">تصميم مخصص</h3>
                <p className="mb-6 text-center">فساتين سهرة فريدة مصممة خصيصًا لك، من الفكرة إلى الإبداع.</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle primary-color ml-2 mt-1"></i>
                    <span>استشارات تصميم مخصصة</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle primary-color ml-2 mt-1"></i>
                    <span>إنشاء أنماط مخصصة</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle primary-color ml-2 mt-1"></i>
                    <span>اختيار الأقمشة الفاخرة</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Service 2 */}
            <div className="service-card bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex justify-center mb-6">
                  <i className="fas fa-cut text-5xl primary-color"></i>
                </div>
                <h3 className="text-2xl font-bold text-center secondary-color mb-4">خياطة مخصصة</h3>
                <p className="mb-6 text-center">خدمات خياطة متخصصة تضمن قياسًا مثاليًا لملابسك المصممة خصيصًا.</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle primary-color ml-2 mt-1"></i>
                    <span>قياسات دقيقة</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle primary-color ml-2 mt-1"></i>
                    <span>جلسات قياس متعددة</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle primary-color ml-2 mt-1"></i>
                    <span>حرفية يدوية متقنة</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 3 */}
            <div className="service-card bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex justify-center mb-6">
                  <i className="fas fa-user-tie text-5xl primary-color"></i>
                </div>
                <h3 className="text-2xl font-bold text-center secondary-color mb-4">استشارات تنسيق الأزياء</h3>
                <p className="mb-6 text-center">نصائح احترافية لتنسيق الأزياء لترتقي بخزانة ملابسك واختياراتك.</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle primary-color ml-2 mt-1"></i>
                    <span>تحليل خزانة الملابس</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle primary-color ml-2 mt-1"></i>
                    <span>توصيات الأسلوب</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle primary-color ml-2 mt-1"></i>
                    <span>تنسيق خاص بالمناسبات</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 light-bg" id="gallery">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold secondary-color mb-4">معرض الأعمال</h2>
            <p className="text-lg max-w-2xl mx-auto">استكشف مجموعتنا من فساتين السهرة والمناسبات الخاصة المصممة خصيصًا.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <img src="/asia4.webp" alt="فستان مخصص" className="w-full h-auto object-contain rounded-lg shadow-md gallery-image" />
            <img src="/asia5.webp" alt="فستان مخصص" className="w-full h-auto object-contain rounded-lg shadow-md gallery-image" />
            <img src="/asia6.webp" alt="فستان مخصص" className="w-full h-auto object-contain rounded-lg shadow-md gallery-image" />
            <img src="/asia8.webp" alt="فستان مخصص" className="w-full h-auto object-contain rounded-lg shadow-md gallery-image" />
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 md:py-24" id="process">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold secondary-color mb-4">مراحل العمل</h2>
            <p className="text-lg max-w-2xl mx-auto">من الفكرة الأولية إلى التسليم النهائي، نضمن تجربة سلسة وممتعة.</p>
          </div>
          <div className="space-y-16">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pl-10 order-2 md:order-1">
                <div className="flex items-center mb-4">
                  <div className="step-number ml-4">1</div>
                  <h3 className="text-2xl font-bold secondary-color">الاستشارة الأولية</h3>
                </div>
                <p className="text-lg mb-4">حددي مكالمة عبر واتساب أو اجتماع شخصي لمناقشة احتياجاتك وتفضيلاتك ورؤيتك في الأزياء.</p>
                <p>خلال هذه الاستشارة، سنستكشف تفضيلات أسلوبك والمناسبات التي تصممين لها وأي متطلبات محددة.</p>
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <img src="/asia7.webp" alt="استشارة" className="rounded-lg shadow-lg w-full h-72 md:h-96 object-cover" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <img src="/asia9.webp" alt="عملية التصميم" className="rounded-lg shadow-lg w-full h-72 md:h-96 object-cover" />
              </div>
              <div className="md:w-1/2 md:pr-10">
                <div className="flex items-center mb-4">
                  <div className="step-number ml-4">2</div>
                  <h3 className="text-2xl font-bold secondary-color">التصميم واختيار المواد</h3>
                </div>
                <p className="text-lg mb-4">تقوم المصممة بإنشاء رسومات تصميم بناءً على متطلباتك وتساعدك في اختيار الأقمشة والمواد الفاخرة.</p>
                <p>نقدم عينات قماش مفصلة وخيارات تصميم للاختيار من بينها، مما يضمن رضاك التام.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pl-10 order-2 md:order-1">
                <div className="flex items-center mb-4">
                  <div className="step-number ml-4">3</div>
                  <h3 className="text-2xl font-bold secondary-color">القياسات والتجربة</h3>
                </div>
                <p className="text-lg mb-4">نأخذ قياسات دقيقة ونحدد مواعيد جلسات تجربة متعددة لضمان مقاس مثالي لملابسك.</p>
                <p>يستخدم خياطونا المتخصصون تقنيات تقليدية وحديثة لإنشاء أنماط خصيصًا لنسب جسمك.</p>
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <img src="/asia10.webp" alt="جلسة قياس" className="rounded-lg shadow-lg w-full h-72 md:h-96 object-cover" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <img src="/asia11.webp" alt="المنتج النهائي" className="rounded-lg shadow-lg w-full h-72 md:h-96 object-cover" />
              </div>
              <div className="md:w-1/2 md:pr-10">
                <div className="flex items-center mb-4">
                  <div className="step-number ml-4">4</div>
                  <h3 className="text-2xl font-bold secondary-color">التسليم النهائي</h3>
                </div>
                <p className="text-lg mb-4">يتم فحص ملابسك النهائية بعناية للتأكد من جودتها وتسليمها لك، مع إرشادات العناية الكاملة.</p>
                <p>نتأكد من أن كل تفصيل يلبي معاييرنا العالية للتميز قبل التسليم النهائي.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 light-bg" id="testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold secondary-color mb-4">آراء العملاء</h2>
            <p className="text-lg max-w-2xl mx-auto">اسمع ما يقوله عملاؤنا عن تجربتهم في العمل معنا.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-lg p-8 relative">
              <div className="absolute top-0 right-0 -mt-5 -mr-5 text-6xl primary-color opacity-20">"</div>
              <div className="mb-6">
                <h4 className="text-xl font-bold secondary-color">فاطمة الخالد</h4>
                <p className="primary-color">مديرة تنفيذية</p>
              </div>
              <p className="text-lg">"الاهتمام بالتفاصيل والخدمة الشخصية تجاوزت توقعاتي. فستان زفافي كان مثاليًا تمامًا وجعلني أشعر كالملكة في يومي الخاص."</p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-lg p-8 relative">
              <div className="absolute top-0 right-0 -mt-5 -mr-5 text-6xl primary-color opacity-20">"</div>
              <div className="mb-6">
                <h4 className="text-xl font-bold secondary-color">نورة الأحمد</h4>
                <p className="primary-color">عميلة دائمة</p>
              </div>
              <p className="text-lg">"كنت بحاجة إلى زي فريد لمؤتمر عمل مهم. لم يقوموا بإنشاء تصميم مذهل فحسب، بل قدموا أيضًا نصائح للتنسيق ساعدتني على ترك انطباع دائم."</p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-lg p-8 relative">
              <div className="absolute top-0 right-0 -mt-5 -mr-5 text-6xl primary-color opacity-20">"</div>
              <div className="mb-6">
                <h4 className="text-xl font-bold secondary-color">سارة الحسن</h4>
                <p className="primary-color">رائدة أعمال</p>
              </div>
              <p className="text-lg">"أنا عميلة منذ أكثر من عامين، ولا أثق بأي شخص آخر بملابسي. جودة وتناسب كل قطعة استثنائية بشكل متسق. قدرتهم على فهم أسلوبي لا مثيل لها في الكويت."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24" id="contact">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold secondary-color mb-4">اتصل بنا</h2>
            <p className="text-lg max-w-2xl mx-auto">هل أنت مستعدة لتحويل رؤيتك في الأزياء إلى حقيقة؟ تواصل معنا اليوم.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold secondary-color mb-6">معلومات التواصل</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <i className="fas fa-map-marker-alt primary-color text-xl mt-1 ml-4"></i>
                    <div>
                      <h4 className="font-bold mb-1">العنوان</h4>
                      <p>المنقف، مدينة الكويت، الكويت</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-clock primary-color text-xl mt-1 ml-4"></i>
                    <div>
                      <h4 className="font-bold mb-1">ساعات العمل</h4>
                      <p>الأحد-الخميس: 10 صباحًا - 8 مساءً<br />الجمعة-السبت: بموعد مسبق</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-phone primary-color text-xl mt-1 ml-4"></i>
                    <div>
                      <h4 className="font-bold mb-1">هاتف</h4>
                      <p dir="ltr">+965 98810169</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h4 className="font-bold mb-4">تابعنا على</h4>
                    <div className="flex space-x-4 space-x-reverse">
                      <a href="https://www.instagram.com/qaserat_altaref/" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center transition-colors hover:bg-primary-bg hover:text-white">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="https://www.tiktok.com/@qaserat_altaref" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center transition-colors hover:bg-primary-bg hover:text-white">
                        <i className="fab fa-tiktok"></i>
                      </a>
                      <a href="https://www.snapchat.com/add/qaserat_altaref" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center transition-colors hover:bg-primary-bg hover:text-white">
                        <i className="fab fa-snapchat-ghost"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold secondary-color mb-6">تواصل معنا</h3>
                <p className="mb-6">اختر طريقة التواصل المفضلة لديك. نحن دائمًا مستعدون لمساعدتك في احتياجاتك من الأزياء.</p>
                <div className="space-y-4">
                  <a href="https://wa.me/96598810169?text=مرحباً،%20أرغب%20في%20معرفة%20المزيد%20عن%20خدمات%20تصميم%20الأزياء%20لديكم" className="block w-full primary-bg text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition duration-300">
                    <i className="fab fa-whatsapp ml-2"></i>تواصل عبر واتساب
                  </a>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">طلبات خاصة</h4>
                    <p className="mb-4">للطلبات العاجلة أو الخاصة، لا تترددي في الاتصال بنا مباشرة وسنلبي احتياجاتك.</p>
                    <a href="https://wa.me/96598810169?text=مرحباً،%20لدي%20طلب%20خاص%20بخصوص%20خدمات%20تصميم%20الأزياء%20لديكم" className="block w-full border-2 border-primary-color text-primary-color text-center py-2 px-4 rounded-lg font-medium hover:bg-primary-color hover:text-white transition duration-300">
                      <i className="fas fa-paper-plane ml-2"></i>إرسال طلب خاص
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-cover bg-center relative" style={{
        backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1920&auto=format&fit=crop')"
      }}>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">هل أنت مستعدة لرفع مستوى أناقتك؟</h2>
          <p className="text-lg text-white max-w-2xl mx-auto mb-8">اختبري فخامة الأزياء المصممة خصيصًا التي تعكس شخصيتك وأسلوبك بشكل مثالي.</p>
          <a href="https://wa.me/96598810169?text=مرحباً،%20أرغب%20في%20معرفة%20المزيد%20عن%20خدمات%20تصميم%20الأزياء%20لديكم" className="inline-flex items-center primary-bg hover:bg-opacity-90 text-white font-medium px-8 py-3 rounded-full shadow-lg text-lg transition duration-300 whatsapp-btn">
            <i className="fab fa-whatsapp ml-2 text-2xl"></i>
            تواصلي معنا الآن
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-white text-xl font-bold mb-2">قاصرات الطرف</h3>
              <p className="text-gray-300">تصميم أزياء فاخر وفساتين مخصصة في الكويت</p>
            </div>
            <div className="flex space-x-6 space-x-reverse">
              <a href="https://www.instagram.com/qaserat_altaref/" className="text-gray-300 hover:text-primary-color transition duration-300">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="https://www.tiktok.com/@qaserat_altaref" className="text-gray-300 hover:text-primary-color transition duration-300">
                <i className="fab fa-tiktok text-xl"></i>
              </a>
              <a href="https://www.snapchat.com/add/qaserat_altaref" className="text-gray-300 hover:text-primary-color transition duration-300">
                <i className="fab fa-snapchat-ghost text-xl"></i>
              </a>
              <a href="https://wa.me/96598810169" className="text-gray-300 hover:text-primary-color transition duration-300">
                <i className="fab fa-whatsapp text-xl"></i>
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400">© 2025 قاصرات الطرف - جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
