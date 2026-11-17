import React, { useEffect, useState } from "react";
import "./App.css";
import profilePhoto from "./profile.jpg";

const content = {
  en: {
    nav: ["Home", "About", "Experience", "Education", "Skills", "Projects", "Contact"],
    themeDark: "🌙 Dark", themeLight: "☀️ Light", themeAria: "Switch theme",
    menuAria: "Toggle navigation", homeEyebrow: "SENIOR JAVA BACKEND DEVELOPER",
    heroTitle: "Hi, I'm", heroSubtitle: "Building reliable backend systems and scalable applications.",
    heroDescription: "Senior Java Backend Developer with 10 years of experience in enterprise application development, microservices, distributed systems, and production support.",
    contactMe: "Contact Me", viewExperience: "View Experience", location: "Pune, India",
    profileRole: "Java Backend Developer", aboutEyebrow: "WHO I AM", aboutTitle: "About Me",
    aboutP1: "I am a Senior Java Backend Developer with 10 years of experience building and supporting enterprise applications. My experience includes casino gaming applications, microservices, event-driven systems, REST API development, production troubleshooting, and database performance investigation.",
    aboutP2: "I have also taken team-lead responsibilities, supporting and coordinating a team of 8 engineers over the last 1.5 years of my experience. I enjoy solving complex technical problems and delivering stable, maintainable software.",
    career: "CAREER JOURNEY", experienceTitle: "Professional Experience", experienceIntro: "Company-wise experience and key responsibilities.",
    roleLead: "Senior Software Engineer | Team Lead Responsibilities", roleEngineer: "Software Engineer",
    projectLabel: "Project:", technologies: "Technologies:",
    exp: [
      [
        "Led and supported a team of 8 engineers, coordinating daily technical activities, task allocation, and delivery.",
        "Provided technical guidance, resolved development challenges, and supported code quality improvements.",
        "Managed production incidents, performed root-cause analysis, and collaborated with cross-functional teams.",
        "Worked with Kafka event-driven processing, investigated message flows, data inconsistencies, and message-processing issues.",
        "Developed scalable microservices using Spring Boot and Spring Cloud, with Kafka and ActiveMQ for asynchronous communication.",
        "Built secure REST APIs and worked with PostgreSQL, database troubleshooting, and performance tuning.",
        "Supported CI/CD workflows, Docker, Kubernetes, and integrations for KYC and email/SMS notifications."
      ],
      [
        "Developed backend functionality using Core Java, Spring MVC, and REST APIs.",
        "Implemented IMEI and serial-number validation features.",
        "Worked with MongoDB collections, document structures, and application features.",
        "Collaborated with frontend developers to integrate backend APIs."
      ],
      [
        "Developed REST APIs and application modules using Java, Servlets, JSP, and Hibernate.",
        "Worked on Admin, Seller, and Buyer portals.",
        "Implemented product management, customer reviews, and bulk purchase ordering features.",
        "Participated in the software development lifecycle, requirement understanding, and data-flow implementation."
      ]
    ],
    academic: "ACADEMIC BACKGROUND", education: "Education", mca: "Master of Computer Applications (MCA)",
    bca: "Bachelor of Computer Applications (BCA)", selected: "SELECTED WORK", projects: "Projects",
    skillTitle: "Skills & Technologies", expertise: "TECHNICAL EXPERTISE",
    skillCategories: ["Programming", "Backend", "Databases", "Messaging", "DevOps & Tools", "Web Technologies"],
    projectDescriptions: [
      "Enterprise casino gaming application built with Spring Boot microservices, Kafka-based event processing, REST APIs, and production integrations.",
      "Application backend work involving IMEI and serial-number validation, REST APIs, and MongoDB.",
      "B2B ecommerce platform with Admin, Seller, and Buyer portals, product management, reviews, and bulk purchase workflows.",
      "Personal project for managing school operations, admissions, students, teachers, attendance, fees, and announcements.",
      "Personal full-stack application for generating and managing unique scanner codes."
    ],
    getInTouch: "GET IN TOUCH", contactTitle: "Contact & Address",
    contactIntro: "Contact details are available with both address locations.",
    permanent: "Permanent Address", present: "Present Address", primary: "Primary Phone",
    secondary: "Secondary Phone", email: "Email", nationality: "Nationality", indian: "Indian",
    permanentAddress: "Kujap, Kujapi, Chandauti, Gaya, Bihar, 823002",
    presentAddress: ["C/O: Aai Sahab Building", "Parkhe Wasti", "Near Herai Sitai Temple", "Hinjawadi Phase 1", "Pune, Maharashtra - 411014"],
    backTop: "Back to top", rights: "All rights reserved.", footerIntro: "©"
  },
  hi: {
    nav: ["होम", "परिचय", "कार्य अनुभव", "शिक्षा", "कौशल", "परियोजनाएँ", "संपर्क"],
    themeDark: "🌙 डार्क", themeLight: "☀️ लाइट", themeAria: "थीम बदलें",
    menuAria: "नेविगेशन खोलें या बंद करें", homeEyebrow: "सीनियर जावा बैकएंड डेवलपर",
    heroTitle: "नमस्ते, मैं हूँ", heroSubtitle: "विश्वसनीय बैकएंड सिस्टम और विस्तार योग्य एप्लिकेशन बनाना।",
    heroDescription: "एंटरप्राइज़ एप्लिकेशन विकास, माइक्रोसर्विसेज़, वितरित प्रणालियों और प्रोडक्शन सपोर्ट में 10 वर्षों के अनुभव वाला सीनियर जावा बैकएंड डेवलपर।",
    contactMe: "संपर्क करें", viewExperience: "कार्य अनुभव देखें", location: "पुणे, भारत",
    profileRole: "जावा बैकएंड डेवलपर", aboutEyebrow: "मेरा परिचय", aboutTitle: "मेरे बारे में",
    aboutP1: "मैं 10 वर्षों के अनुभव वाला सीनियर जावा बैकएंड डेवलपर हूँ। मुझे एंटरप्राइज़ एप्लिकेशन, कैसीनो गेमिंग एप्लिकेशन, माइक्रोसर्विसेज़, इवेंट-आधारित सिस्टम, REST API विकास, प्रोडक्शन समस्याओं और डेटाबेस प्रदर्शन की जाँच का अनुभव है।",
    aboutP2: "अपने अनुभव के पिछले 1.5 वर्षों में मैंने टीम लीड की जिम्मेदारियाँ निभाईं और 8 इंजीनियरों की टीम का मार्गदर्शन तथा समन्वय किया। मुझे जटिल तकनीकी समस्याएँ हल करना और स्थिर, आसानी से रखरखाव योग्य सॉफ्टवेयर बनाना पसंद है।",
    career: "करियर यात्रा", experienceTitle: "व्यावसायिक अनुभव", experienceIntro: "कंपनी के अनुसार कार्य अनुभव और मुख्य जिम्मेदारियाँ।",
    roleLead: "सीनियर सॉफ्टवेयर इंजीनियर | टीम लीड की जिम्मेदारियाँ", roleEngineer: "सॉफ्टवेयर इंजीनियर",
    projectLabel: "परियोजना:", technologies: "तकनीकें:",
    exp: [
      [
        "8 इंजीनियरों की टीम का नेतृत्व और सहयोग किया तथा दैनिक तकनीकी गतिविधियों, कार्य आवंटन और डिलीवरी का समन्वय किया।",
        "तकनीकी मार्गदर्शन दिया, विकास संबंधी समस्याएँ हल कीं और कोड की गुणवत्ता बेहतर बनाने में सहयोग किया।",
        "प्रोडक्शन समस्याओं का प्रबंधन किया, मूल कारण का विश्लेषण किया और विभिन्न टीमों के साथ काम किया।",
        "Kafka आधारित इवेंट प्रोसेसिंग पर काम किया तथा मैसेज फ्लो, डेटा असंगति और मैसेज प्रोसेसिंग समस्याओं की जाँच की।",
        "Spring Boot और Spring Cloud से विस्तार योग्य माइक्रोसर्विसेज़ विकसित कीं तथा एसिंक्रोनस संचार के लिए Kafka और ActiveMQ का उपयोग किया।",
        "सुरक्षित REST API बनाए और PostgreSQL, डेटाबेस समस्या निवारण तथा प्रदर्शन सुधार पर काम किया।",
        "CI/CD प्रक्रियाओं, Docker, Kubernetes तथा KYC और ईमेल/SMS सूचना एकीकरण में सहयोग किया।"
      ],
      [
        "Core Java, Spring MVC और REST API का उपयोग करके बैकएंड सुविधाएँ विकसित कीं।",
        "IMEI और सीरियल नंबर सत्यापन सुविधाएँ लागू कीं।",
        "MongoDB कलेक्शन, डॉक्यूमेंट संरचना और एप्लिकेशन सुविधाओं पर काम किया।",
        "बैकएंड API को जोड़ने के लिए फ्रंटएंड डेवलपर्स के साथ सहयोग किया।"
      ],
      [
        "Java, Servlets, JSP और Hibernate का उपयोग करके REST API तथा एप्लिकेशन मॉड्यूल विकसित किए।",
        "Admin, Seller और Buyer पोर्टल पर काम किया।",
        "प्रोडक्ट प्रबंधन, ग्राहक समीक्षाएँ और थोक ऑर्डर सुविधाएँ लागू कीं।",
        "सॉफ्टवेयर विकास प्रक्रिया, आवश्यकताओं को समझने और डेटा फ्लो लागू करने में भाग लिया।"
      ]
    ],
    academic: "शैक्षणिक पृष्ठभूमि", education: "शिक्षा", mca: "कंप्यूटर एप्लिकेशन में स्नातकोत्तर (MCA)",
    bca: "कंप्यूटर एप्लिकेशन में स्नातक (BCA)", selected: "चयनित कार्य", projects: "परियोजनाएँ",
    skillTitle: "कौशल और तकनीकें", expertise: "तकनीकी विशेषज्ञता",
    skillCategories: ["प्रोग्रामिंग", "बैकएंड", "डेटाबेस", "मैसेजिंग", "DevOps और टूल्स", "वेब तकनीकें"],
    projectDescriptions: [
      "Spring Boot माइक्रोसर्विसेज़, Kafka आधारित इवेंट प्रोसेसिंग, REST API और प्रोडक्शन एकीकरण से बना एंटरप्राइज़ कैसीनो गेमिंग एप्लिकेशन।",
      "IMEI और सीरियल नंबर सत्यापन, REST API तथा MongoDB से संबंधित एप्लिकेशन बैकएंड कार्य।",
      "Admin, Seller और Buyer पोर्टल, प्रोडक्ट प्रबंधन, समीक्षाओं और थोक खरीद प्रक्रिया वाला B2B ई-कॉमर्स प्लेटफॉर्म।",
      "स्कूल संचालन, प्रवेश, विद्यार्थियों, शिक्षकों, उपस्थिति, फीस और घोषणाओं के प्रबंधन के लिए व्यक्तिगत परियोजना।",
      "यूनिक स्कैनर कोड बनाने और प्रबंधित करने के लिए व्यक्तिगत फुल-स्टैक एप्लिकेशन।"
    ],
    getInTouch: "संपर्क करें", contactTitle: "संपर्क और पता",
    contactIntro: "दोनों पतों के साथ संपर्क विवरण उपलब्ध हैं।",
    permanent: "स्थायी पता", present: "वर्तमान पता", primary: "प्राथमिक मोबाइल",
    secondary: "द्वितीयक मोबाइल", email: "ईमेल", nationality: "राष्ट्रीयता", indian: "भारतीय",
    permanentAddress: "कुजाप, कुजापी, चंदौती, गया, बिहार, 823002",
    presentAddress: ["सी/ओ: आई साहब बिल्डिंग", "पारखे वस्ती", "हेराई सिताई मंदिर के पास", "हिंजवडी फेज 1", "पुणे, महाराष्ट्र - 411014"],
    backTop: "ऊपर जाएँ", rights: "सर्वाधिकार सुरक्षित।", footerIntro: "©"
  },
  mr: {
    nav: ["मुख्यपृष्ठ", "माझ्याबद्दल", "कामाचा अनुभव", "शिक्षण", "कौशल्ये", "प्रकल्प", "संपर्क"],
    themeDark: "🌙 डार्क", themeLight: "☀️ लाइट", themeAria: "थीम बदला",
    menuAria: "नेव्हिगेशन उघडा किंवा बंद करा", homeEyebrow: "सिनियर जावा बॅकएंड डेव्हलपर",
    heroTitle: "नमस्कार, मी", heroSubtitle: "विश्वासार्ह बॅकएंड प्रणाली आणि विस्तारक्षम अॅप्लिकेशन्स तयार करतो.",
    heroDescription: "एंटरप्राइझ अॅप्लिकेशन विकास, मायक्रोसर्व्हिसेस, वितरित प्रणाली आणि प्रोडक्शन सपोर्टमध्ये 10 वर्षांचा अनुभव असलेला सिनियर जावा बॅकएंड डेव्हलपर.",
    contactMe: "संपर्क साधा", viewExperience: "कामाचा अनुभव पाहा", location: "पुणे, भारत",
    profileRole: "जावा बॅकएंड डेव्हलपर", aboutEyebrow: "माझ्याबद्दल", aboutTitle: "माझ्याबद्दल",
    aboutP1: "मी 10 वर्षांचा अनुभव असलेला सिनियर जावा बॅकएंड डेव्हलपर आहे. मला एंटरप्राइझ अॅप्लिकेशन्स, कॅसिनो गेमिंग अॅप्लिकेशन्स, मायक्रोसर्व्हिसेस, इव्हेंट-आधारित प्रणाली, REST API विकास, प्रोडक्शनमधील समस्या आणि डेटाबेस कार्यक्षमता तपासण्याचा अनुभव आहे.",
    aboutP2: "माझ्या अनुभवातील मागील 1.5 वर्षांत मी टीम लीडची जबाबदारी सांभाळली आणि 8 अभियंत्यांच्या टीमला मार्गदर्शन व समन्वय दिला. गुंतागुंतीच्या तांत्रिक समस्या सोडवणे आणि स्थिर, देखभाल करण्यास सोपे सॉफ्टवेअर तयार करणे मला आवडते.",
    career: "कारकीर्द प्रवास", experienceTitle: "व्यावसायिक अनुभव", experienceIntro: "कंपनीनुसार कामाचा अनुभव आणि प्रमुख जबाबदाऱ्या.",
    roleLead: "सिनियर सॉफ्टवेअर इंजिनिअर | टीम लीड जबाबदाऱ्या", roleEngineer: "सॉफ्टवेअर इंजिनिअर",
    projectLabel: "प्रकल्प:", technologies: "तंत्रज्ञान:",
    exp: [
      [
        "8 अभियंत्यांच्या टीमचे नेतृत्व आणि सहकार्य केले; दैनंदिन तांत्रिक कामे, कामांचे वाटप आणि डिलिव्हरी यांचा समन्वय साधला.",
        "तांत्रिक मार्गदर्शन केले, विकासातील अडचणी सोडवल्या आणि कोडची गुणवत्ता सुधारण्यास मदत केली.",
        "प्रोडक्शनमधील घटनांचे व्यवस्थापन केले, मूळ कारणांचे विश्लेषण केले आणि विविध टीम्ससोबत काम केले.",
        "Kafka आधारित इव्हेंट प्रोसेसिंगवर काम केले; मेसेज फ्लो, डेटामधील विसंगती आणि मेसेज प्रोसेसिंग समस्यांची तपासणी केली.",
        "Spring Boot आणि Spring Cloud वापरून विस्तारक्षम मायक्रोसर्व्हिसेस विकसित केल्या; असिंक्रोनस संवादासाठी Kafka आणि ActiveMQ वापरले.",
        "सुरक्षित REST API तयार केले आणि PostgreSQL, डेटाबेस समस्या निराकरण व कार्यक्षमता सुधारण्यावर काम केले.",
        "CI/CD प्रक्रिया, Docker, Kubernetes तसेच KYC आणि ईमेल/SMS सूचना एकत्रीकरणासाठी सहकार्य केले."
      ],
      [
        "Core Java, Spring MVC आणि REST API वापरून बॅकएंड सुविधा विकसित केल्या.",
        "IMEI आणि सिरीयल नंबर पडताळणी सुविधा लागू केल्या.",
        "MongoDB कलेक्शन्स, डॉक्युमेंट रचना आणि अॅप्लिकेशन सुविधांवर काम केले.",
        "बॅकएंड API जोडण्यासाठी फ्रंटएंड डेव्हलपर्ससोबत सहकार्य केले."
      ],
      [
        "Java, Servlets, JSP आणि Hibernate वापरून REST API व अॅप्लिकेशन मॉड्यूल विकसित केले.",
        "Admin, Seller आणि Buyer पोर्टलवर काम केले.",
        "उत्पादन व्यवस्थापन, ग्राहक अभिप्राय आणि मोठ्या प्रमाणातील खरेदी ऑर्डर सुविधा लागू केल्या.",
        "सॉफ्टवेअर विकास प्रक्रिया, गरजा समजून घेणे आणि डेटा फ्लो अंमलात आणणे यात सहभाग घेतला."
      ]
    ],
    academic: "शैक्षणिक पार्श्वभूमी", education: "शिक्षण", mca: "मास्टर ऑफ कॉम्प्युटर अॅप्लिकेशन्स (MCA)",
    bca: "बॅचलर ऑफ कॉम्प्युटर अॅप्लिकेशन्स (BCA)", selected: "निवडक काम", projects: "प्रकल्प",
    skillTitle: "कौशल्ये आणि तंत्रज्ञान", expertise: "तांत्रिक कौशल्य",
    skillCategories: ["प्रोग्रामिंग", "बॅकएंड", "डेटाबेस", "मेसेजिंग", "DevOps आणि साधने", "वेब तंत्रज्ञान"],
    projectDescriptions: [
      "Spring Boot मायक्रोसर्व्हिसेस, Kafka आधारित इव्हेंट प्रोसेसिंग, REST API आणि प्रोडक्शन एकत्रीकरण वापरून तयार केलेले एंटरप्राइझ कॅसिनो गेमिंग अॅप्लिकेशन.",
      "IMEI आणि सिरीयल नंबर पडताळणी, REST API आणि MongoDB यांचा समावेश असलेले अॅप्लिकेशन बॅकएंड काम.",
      "Admin, Seller आणि Buyer पोर्टल, उत्पादन व्यवस्थापन, अभिप्राय आणि मोठ्या प्रमाणातील खरेदी प्रक्रिया असलेले B2B ई-कॉमर्स प्लॅटफॉर्म.",
      "शाळेचे कामकाज, प्रवेश, विद्यार्थी, शिक्षक, उपस्थिती, फी आणि सूचना व्यवस्थापित करण्यासाठी वैयक्तिक प्रकल्प.",
      "युनिक स्कॅनर कोड तयार आणि व्यवस्थापित करण्यासाठी वैयक्तिक फुल-स्टॅक अॅप्लिकेशन."
    ],
    getInTouch: "संपर्क साधा", contactTitle: "संपर्क आणि पत्ता",
    contactIntro: "दोन्ही पत्त्यांसह संपर्क तपशील उपलब्ध आहेत.",
    permanent: "कायमचा पत्ता", present: "सध्याचा पत्ता", primary: "प्राथमिक मोबाइल",
    secondary: "दुय्यम मोबाइल", email: "ईमेल", nationality: "राष्ट्रीयत्व", indian: "भारतीय",
    permanentAddress: "कुजाप, कुजापी, चंदौती, गया, बिहार, 823002",
    presentAddress: ["सी/ओ: आई साहेब बिल्डिंग", "पारखे वस्ती", "हेराई सिताई मंदिराजवळ", "हिंजवडी फेज 1", "पुणे, महाराष्ट्र - 411014"],
    backTop: "वर जा", rights: "सर्व हक्क राखीव.", footerIntro: "©"
  }
};

const experienceData = [
  {
    company: "Alteatec IT Solutions Pvt. Ltd.", project: "Casino Gaming Application",
    period: "Aug 2018 – Jun 2026",
    technologies: "Java, Spring Boot, Spring Cloud, Microservices, Kafka, ActiveMQ, PostgreSQL, Docker, Kubernetes"
  },
  {
    company: "Connecticus Technology Pvt. Ltd.", project: "GoNoGo",
    period: "Aug 2017 – Jul 2018",
    technologies: "Core Java, Spring MVC, REST APIs, MongoDB"
  },
  {
    company: "A9 Online Solution Pvt. Ltd.", project: "Izigro – B2B Ecommerce Platform",
    period: "Jun 2016 – Aug 2017",
    technologies: "Java, Servlets, JSP, Hibernate, Spring"
  }
];

const skills = [
  ["Core Java", "J2EE"],
  ["Spring", "Spring Boot", "Spring MVC", "Spring Cloud", "REST APIs", "Microservices"],
  ["PostgreSQL", "MySQL", "Oracle", "MongoDB"],
  ["Apache Kafka", "ActiveMQ", "Artemis"],
  ["Docker", "Kubernetes", "CI/CD", "Git", "Maven", "Jira"],
  ["HTML", "CSS", "JavaScript", "jQuery", "Servlets", "JSP"]
];

const projectData = [
  { name: "Casino Gaming Application", stack: "Java · Spring Boot · Microservices · Kafka · PostgreSQL" },
  { name: "GoNoGo", stack: "Java · Spring MVC · REST APIs · MongoDB" },
  { name: "Izigro – B2B Ecommerce Platform", stack: "Java · Servlets · JSP · Hibernate" },
  { name: "AIM Public School Management", stack: "React · Java · Spring Boot · PostgreSQL" },
  { name: "Unique Scanner", stack: "React · Java · Spring Boot · PostgreSQL" }
];

function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("portfolio-theme") || "light"; }
    catch { return "light"; }
  });
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem("portfolio-language") || "en"; }
    catch { return "en"; }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const t = content[language] || content.en;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("portfolio-theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    try { localStorage.setItem("portfolio-language", language); } catch {}
    document.documentElement.lang = language;
  }, [language]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-mark">IA</span><span>Ibrar Alam</span>
        </a>
        <button className="menu-toggle" type="button" aria-label={t.menuAria}
          aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>☰</button>
        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          {t.nav.map((label, index) => {
            const ids = ["home", "about", "experience", "education", "skills", "projects", "contact"];
            return <a key={ids[index]} href={`#${ids[index]}`} onClick={closeMenu}>{label}</a>;
          })}
          <select className="language-select" value={language}
            onChange={(event) => setLanguage(event.target.value)} aria-label="Select language">
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
          </select>
          <button className="theme-toggle" type="button"
            onClick={() => setTheme((current) => current === "light" ? "dark" : "light")}
            aria-label={t.themeAria}>
            {theme === "light" ? t.themeDark : t.themeLight}
          </button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section-container">
          <div className="hero-copy">
            <p className="eyebrow">{t.homeEyebrow}</p>
            <h1>{t.heroTitle} <span>Ibrar Alam</span></h1>
            <h2>{t.heroSubtitle}</h2>
            <p className="hero-description">{t.heroDescription}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">{t.contactMe}</a>
              <a className="button button-secondary" href="#experience">{t.viewExperience}</a>
            </div>
            <div className="hero-meta">
              <span>📍 {t.location}</span>
              <a href="mailto:ibrar75alam@gmail.com">✉ ibrar75alam@gmail.com</a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Developer profile photograph">
            <div className="hero-orbit orbit-one"></div><div className="hero-orbit orbit-two"></div>
            <div className="profile-card">
              <img className="profile-avatar profile-photo" src={profilePhoto} alt="Ibrar Alam - Senior Java Backend Developer" />
              <p className="profile-name">Ibrar Alam</p>
              <p className="profile-role">{t.profileRole}</p>
              <div className="profile-tags"><span>Java</span><span>Spring Boot</span><span>Kafka</span><span>Microservices</span></div>
            </div>
          </div>
        </section>

        <section id="about" className="section-container section-block">
          <div className="section-heading"><p className="eyebrow">{t.aboutEyebrow}</p><h2>{t.aboutTitle}</h2></div>
          <div className="about-panel"><p>{t.aboutP1}</p><p>{t.aboutP2}</p></div>
        </section>

        <section id="experience" className="section-container section-block">
          <div className="section-heading">
            <p className="eyebrow">{t.career}</p><h2>{t.experienceTitle}</h2><p>{t.experienceIntro}</p>
          </div>
          <div className="experience-list">
            {experienceData.map((job, index) => (
              <article className="experience-card" key={job.company}>
                <div className="experience-top"><div>
                  <h3>{index === 0 ? t.roleLead : t.roleEngineer}</h3>
                  <h4>{job.company}</h4>
                  <p className="project-name">{t.projectLabel} {job.project}</p>
                </div><span className="period">{job.period}</span></div>
                <ul>{t.exp[index].map((point) => <li key={point}>{point}</li>)}</ul>
                <p className="technology-line"><strong>{t.technologies}</strong> {job.technologies}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section-container section-block">
          <div className="section-heading"><p className="eyebrow">{t.academic}</p><h2>{t.education}</h2></div>
          <div className="education-grid">
            <article className="info-card"><span className="card-icon">🎓</span><h3>{t.mca}</h3><p>JSPM, {language === "en" ? "Pune" : language === "hi" ? "पुणे" : "पुणे"}</p><span className="muted">2014</span></article>
            <article className="info-card"><span className="card-icon">🎓</span><h3>{t.bca}</h3><p>PTU</p><span className="muted">2011</span></article>
          </div>
        </section>

        <section id="skills" className="section-container section-block">
          <div className="section-heading"><p className="eyebrow">{t.expertise}</p><h2>{t.skillTitle}</h2></div>
          <div className="skills-grid">
            {skills.map((items, index) => (
              <article className="skill-card" key={index}>
                <h3>{t.skillCategories[index]}</h3>
                <div className="skill-tags">{items.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section-container section-block">
          <div className="section-heading"><p className="eyebrow">{t.selected}</p><h2>{t.projects}</h2></div>
          <div className="projects-grid">
            {projectData.map((project, index) => (
              <article className="project-card" key={project.name}>
                <div className="project-symbol">{"</>"}</div><h3>{project.name}</h3>
                <p>{t.projectDescriptions[index]}</p><span className="project-stack">{project.stack}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section-container section-block contact-section">
          <div className="section-heading"><p className="eyebrow">{t.getInTouch}</p><h2>{t.contactTitle}</h2><p>{t.contactIntro}</p></div>
          <div className="contact-grid address-grid">
            <article className="contact-card address-card">
              <div className="contact-icon">🏠</div><h3>{t.permanent}</h3>
              <p className="address-text">{t.permanentAddress}</p>
              <div className="address-contact-details">
                <p><strong>{t.primary}:</strong> <a href="tel:+919146900632">+91-9146900632</a></p>
                <p><strong>{t.secondary}:</strong> <a href="tel:+919272356954">+91-9272356954</a></p>
                <p><strong>{t.email}:</strong> <a href="mailto:ibrar75alam@gmail.com">ibrar75alam@gmail.com</a></p>
                <p><strong>{t.nationality}:</strong> {t.indian}</p>
              </div>
            </article>
            <article className="contact-card address-card">
              <div className="contact-icon">📍</div><h3>{t.present}</h3>
              <p className="address-text">{t.presentAddress.map((line, index) => <React.Fragment key={line}>{line}{index < t.presentAddress.length - 1 && <br />}</React.Fragment>)}</p>
              <div className="address-contact-details">
                <p><strong>{t.primary}:</strong> <a href="tel:+919146900632">+91-9146900632</a></p>
                <p><strong>{t.secondary}:</strong> <a href="tel:+919272356954">+91-9272356954</a></p>
                <p><strong>{t.email}:</strong> <a href="mailto:ibrar75alam@gmail.com">ibrar75alam@gmail.com</a></p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer"><p>© {new Date().getFullYear()} Ibrar Alam. {t.rights}</p><a href="#home">{t.backTop} ↑</a></footer>
    </div>
  );
}

export default App;
