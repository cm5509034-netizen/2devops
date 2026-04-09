"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Icons as SVG components
const ArrowRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const Check = () => (
  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const Terminal = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Cloud = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

const Cog = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Shield = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const Rocket = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const Lock = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const CreditCard = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const Mail = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

// Wompi Logo
const WompiLogo = () => (
  <svg viewBox="0 0 100 32" className="h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 8L8 24H12L14.5 14L17 24H21L23.5 14L26 24H30L25.5 8H21.5L19 18L16.5 8H12.5Z" fill="#00D9A5"/>
    <path d="M32 16C32 11.6 35.1 8 40 8C44.9 8 48 11.6 48 16C48 20.4 44.9 24 40 24C35.1 24 32 20.4 32 16ZM44 16C44 13.8 42.4 12 40 12C37.6 12 36 13.8 36 16C36 18.2 37.6 20 40 20C42.4 20 44 18.2 44 16Z" fill="#00D9A5"/>
    <path d="M50 8H54V10C55.2 8.8 56.8 8 59 8C61.2 8 63 8.8 64 10.5C65.5 8.8 67.5 8 70 8C74 8 76 10.5 76 14.5V24H72V15C72 13 71 12 69 12C67 12 66 13 66 15V24H62V15C62 13 61 12 59 12C57 12 56 13 56 15V24H50V8H50Z" fill="#00D9A5"/>
    <path d="M78 8H82V10C83.2 8.6 85 8 87 8C91 8 94 11.5 94 16C94 20.5 91 24 87 24C85 24 83.2 23.4 82 22V30H78V8ZM90 16C90 13.5 88.2 12 86 12C83.8 12 82 13.5 82 16C82 18.5 83.8 20 86 20C88.2 20 90 18.5 90 16Z" fill="#00D9A5"/>
    <circle cx="97" cy="21" r="3" fill="#00D9A5"/>
  </svg>
);

// Configuración de Wompi - SANDBOX (para pruebas)
// Para producción, cambiar a pub_prod_... y el endpoint a production.wompi.co
const WOMPI_PUBLIC_KEY = "pub_test_g8ebxmCAyMRicPH6eNVqPBAO2jWpIqOD"; // Llave de prueba
const WOMPI_REDIRECT_URL = typeof window !== 'undefined' ? `${window.location.origin}/` : "https://localhost:3000/";

// Función para generar referencia única
const generateReference = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `DEVOPS-${timestamp}-${random}`;
};

export default function Home() {
  const [hours, setHours] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentReference, setPaymentReference] = useState("DEVOPS-INIT");
  const wompiFormRef = useRef<HTMLFormElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const PRICE_PER_HOUR = 15;
  const PRICE_PER_HOUR_COP = 60000; // $15 USD ≈ $60,000 COP aproximadamente
  const totalPrice = hours * PRICE_PER_HOUR;
  const totalPriceCOP = hours * PRICE_PER_HOUR_COP;
  const amountInCents = totalPriceCOP * 100;

  // Marcar como montado para evitar problemas de hidratación
  useEffect(() => {
    setIsMounted(true);
    setPaymentReference(generateReference());
  }, []);

  // Generar nueva referencia cuando cambian las horas
  useEffect(() => {
    if (isMounted) {
      setPaymentReference(generateReference());
    }
  }, [hours, isMounted]);

  // Cargar script de Wompi
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://checkout.wompi.co/widget.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const handleHoursChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0 && numValue <= 999) {
      setHours(numValue);
    }
  };

  const incrementHours = () => {
    if (hours < 999) setHours(hours + 1);
  };

  const decrementHours = () => {
    if (hours > 1) setHours(hours - 1);
  };

  const handlePayWithWompi = () => {
    if (hours < 1) return;

    // Generar nueva referencia para esta transacción
    const newReference = generateReference();
    setPaymentReference(newReference);
    setIsLoading(true);

    // Pequeño delay para asegurar que el script de Wompi esté cargado
    setTimeout(() => {
      if (wompiFormRef.current) {
        // Actualizar los valores del formulario
        const publicKeyInput = wompiFormRef.current.querySelector('input[name="public-key"]') as HTMLInputElement;
        const currencyInput = wompiFormRef.current.querySelector('input[name="currency"]') as HTMLInputElement;
        const amountInput = wompiFormRef.current.querySelector('input[name="amount-in-cents"]') as HTMLInputElement;
        const referenceInput = wompiFormRef.current.querySelector('input[name="reference"]') as HTMLInputElement;
        const redirectInput = wompiFormRef.current.querySelector('input[name="redirect-url"]') as HTMLInputElement;

        if (publicKeyInput) publicKeyInput.value = WOMPI_PUBLIC_KEY;
        if (currencyInput) currencyInput.value = "COP";
        if (amountInput) amountInput.value = amountInCents.toString();
        if (referenceInput) referenceInput.value = newReference;
        if (redirectInput) redirectInput.value = WOMPI_REDIRECT_URL;

        // Buscar y hacer clic en el botón del widget de Wompi
        const wompiButton = wompiFormRef.current.querySelector('button[type="button"]') as HTMLButtonElement;
        if (wompiButton) {
          wompiButton.click();
        }
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-background grid-bg relative">


      {/* Background Orbs */}
      <div className="gradient-orb orb-cyan w-[600px] h-[600px] -top-48 -left-48 fixed animate-pulse-glow" />
      <div className="gradient-orb orb-blue w-[500px] h-[500px] top-1/3 -right-48 fixed animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="gradient-orb orb-cyan w-[400px] h-[400px] bottom-0 left-1/4 fixed animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
              <Terminal />
            </div>
            <span className="text-xl font-bold tracking-tight">DevOps<span className="text-primary">Pro</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">Servicios</a>
            <a href="#planes" className="text-muted-foreground hover:text-foreground transition-colors">Planes</a>
            <a href="#pago" className="text-muted-foreground hover:text-foreground transition-colors">Pago</a>
          </div>
          <Button
            className="btn-primary text-primary-foreground font-semibold px-6"
            onClick={() => window.open('https://wa.me/573114366027?text=Hola%2C%20estoy%20interesado%20en%20los%20servicios%20DevOps', '_blank')}
          >
            Contactar
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
            Infraestructura Cloud de Nueva Generación
          </Badge>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Escalabilidad
            <br />
            <span className="text-gradient-cyan">sin fricciones</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Automatizamos tu infraestructura para que tu equipo se enfoque en lo que importa:
            <span className="text-foreground font-medium"> construir productos excepcionales.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="btn-primary text-primary-foreground font-semibold px-8 py-6 text-lg group"
              onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Comenzar Ahora
              <ArrowRight />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/50 hover:bg-secondary/50 px-8 py-6 text-lg"
              onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient-cyan">99.9%</div>
              <div className="text-muted-foreground mt-2">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient-cyan">50+</div>
              <div className="text-muted-foreground mt-2">Clientes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient-cyan">24/7</div>
              <div className="text-muted-foreground mt-2">Soporte</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">Scroll</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Services Section */}
      <section id="servicios" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-foreground">Nuestros Servicios</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Soluciones DevOps <span className="text-gradient-cyan">Integrales</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Desde la estrategia hasta la implementación, cubrimos todo el ciclo de vida de tu infraestructura.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1: Consultoría y Estrategia */}
            <Card className="service-card animated-border p-8 bg-card/50 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center mb-6 text-primary">
                <Cog />
              </div>
              <h3 className="text-2xl font-bold mb-4">Consultoría y Estrategia</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Analizamos tu infraestructura actual y diseñamos una hoja de ruta personalizada para alcanzar tus objetivos de negocio con eficiencia máxima.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Auditoría de infraestructura</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Roadmap de transformación</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Optimización de costos cloud</span>
                </li>
              </ul>
            </Card>

            {/* Service 2: Automatización CI/CD */}
            <Card className="service-card animated-border p-8 bg-card/50 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center mb-6 text-primary">
                <Rocket />
              </div>
              <h3 className="text-2xl font-bold mb-4">Automatización CI/CD</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Implementamos pipelines robustos que aceleran tu ciclo de desarrollo. Despliega con confianza, múltiples veces al día.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Jenkins, GitLab CI, GitHub Actions</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Testing automatizado</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Rollbacks automáticos</span>
                </li>
              </ul>
            </Card>

            {/* Service 3: Infraestructura como Código */}
            <Card className="service-card animated-border p-8 bg-card/50 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center mb-6 text-primary">
                <Cloud />
              </div>
              <h3 className="text-2xl font-bold mb-4">Infraestructura & Cloud</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Define tu infraestructura como código. Replicable, versionable y escalable. Terraform, Kubernetes y más.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Terraform & Pulumi</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Kubernetes & Docker</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">AWS, GCP, Azure</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Pricing Section - SISTEMA POR HORA CON WOMPI */}
      <section id="planes" className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-foreground">Precio por Hora</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Paga solo por las <span className="text-gradient-cyan">Horas que Necesitas</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sin suscripciones ni compromisos. Selecciona las horas de servicio DevOps que requieres y paga únicamente por ellas.
            </p>
          </div>

          {/* Single Pricing Card */}
          <Card className="pricing-card featured p-10 relative overflow-hidden glow-cyan max-w-xl mx-auto">
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
              Flexible
            </Badge>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Servicio DevOps por Hora</h3>
              <p className="text-muted-foreground">Consultoría, CI/CD, Infraestructura Cloud y más</p>
            </div>

            {/* Price Display */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl font-bold text-gradient-cyan">${PRICE_PER_HOUR}</span>
                <span className="text-2xl text-muted-foreground">USD/hora</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                ≈ ${PRICE_PER_HOUR_COP.toLocaleString('es-CO')} COP/hora
              </p>
            </div>

            {/* Hours Selector */}
            <div className="mb-8">
              <Label htmlFor="hours" className="text-center block mb-4 text-lg font-medium">
                ¿Cuántas horas necesitas?
              </Label>
              <div className="flex items-center justify-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-14 h-14 text-2xl font-bold border-border/50 hover:bg-secondary/50"
                  onClick={decrementHours}
                  disabled={hours <= 1}
                >
                  -
                </Button>
                <Input
                  id="hours"
                  type="number"
                  min="1"
                  max="999"
                  value={hours}
                  onChange={(e) => handleHoursChange(e.target.value)}
                  className="w-28 h-14 text-center text-2xl font-bold bg-background border-border/50 focus:border-primary"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-14 h-14 text-2xl font-bold border-border/50 hover:bg-secondary/50"
                  onClick={incrementHours}
                  disabled={hours >= 999}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Total Calculation */}
            <div className="bg-secondary/30 rounded-xl p-6 mb-8">
              <div className="flex justify-between items-center text-lg mb-2">
                <span className="text-muted-foreground">{hours} hora(s) × ${PRICE_PER_HOUR} USD</span>
                <span className="text-2xl font-bold text-gradient-cyan">${totalPrice} USD</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Total en pesos colombianos:</span>
                <span className="font-semibold text-primary">${totalPriceCOP.toLocaleString('es-CO')} COP</span>
              </div>
            </div>

            {/* What's Included */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check />
                <span>Consultoría DevOps especializada</span>
              </li>
              <li className="flex items-start gap-3">
                <Check />
                <span>Setup y configuración CI/CD</span>
              </li>
              <li className="flex items-start gap-3">
                <Check />
                <span>Infraestructura como código</span>
              </li>
              <li className="flex items-start gap-3">
                <Check />
                <span>Kubernetes, Docker, Terraform</span>
              </li>
              <li className="flex items-start gap-3">
                <Check />
                <span>AWS, GCP, Azure</span>
              </li>
              <li className="flex items-start gap-3">
                <Check />
                <span>Soporte durante el servicio</span>
              </li>
            </ul>

            {/* Wompi Payment Button */}
            <div className="space-y-4">
              <form
                action="https://checkout.wompi.co/p/"
                method="GET"
                className="w-full"
              >
                <input type="hidden" name="public-key" value={WOMPI_PUBLIC_KEY} />
                <input type="hidden" name="currency" value="COP" />
                <input type="hidden" name="amount-in-cents" value={amountInCents} />
                <input type="hidden" name="reference" value={paymentReference} />
                <input type="hidden" name="redirect-url" value={WOMPI_REDIRECT_URL} />

                <Button
                  type="submit"
                  className="w-full bg-[#00D9A5] hover:bg-[#00C294] text-white py-6 text-lg font-semibold flex items-center justify-center gap-3 transition-all"
                  disabled={hours < 1 || isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Procesando...
                    </span>
                  ) : (
                    <>
                      <CreditCard />
                      Pagar ${totalPriceCOP.toLocaleString('es-CO')} COP con Wompi
                    </>
                  )}
                </Button>
              </form>

              {/* Wompi Badge */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <span className="text-sm text-muted-foreground">Pagos seguros con</span>
                <WompiLogo />
              </div>

              {/* Payment Methods */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
                <span className="bg-secondary/50 px-3 py-1 rounded-full">Tarjetas de Crédito</span>
                <span className="bg-secondary/50 px-3 py-1 rounded-full">PSE</span>
                <span className="bg-secondary/50 px-3 py-1 rounded-full">Nequi</span>
                <span className="bg-secondary/50 px-3 py-1 rounded-full">Bancolombia</span>
                <span className="bg-secondary/50 px-3 py-1 rounded-full">Efecty</span>
              </div>
            </div>
          </Card>

          {/* Quick Select Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="text-muted-foreground self-center mr-2">Selección rápida:</span>
            {[5, 10, 20, 40].map((h) => (
              <Button
                key={h}
                variant="outline"
                size="sm"
                className={`border-border/50 hover:bg-secondary/50 ${hours === h ? 'bg-primary/20 border-primary' : ''}`}
                onClick={() => setHours(h)}
              >
                {h} horas
              </Button>
            ))}
          </div>

          {/* Sandbox Notice */}
          <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg max-w-xl mx-auto">
            <p className="text-sm text-yellow-500 text-center">
              <strong>Modo de Prueba (Sandbox):</strong> Este es un entorno de pruebas.
              Para pagos reales, contacta al administrador para activar el modo producción.
            </p>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Payment Section */}
      <section id="pago" className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-foreground">Pago Seguro</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Proceso de <span className="text-gradient-cyan">Pago Seguro</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tu seguridad es nuestra prioridad. Procesamos todos los pagos con Wompi, la pasarela de pagos líder en Colombia.
            </p>
          </div>

          <Card className="animated-border p-10 bg-card/50 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left: Process Steps */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <CreditCard />
                  Flujo de Pago
                </h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Selecciona las horas</h4>
                      <p className="text-sm text-muted-foreground">Elige cuántas horas de servicio DevOps necesitas.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Haz clic en Pagar con Wompi</h4>
                      <p className="text-sm text-muted-foreground">Serás redirigido al checkout seguro de Wompi.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Elige tu método de pago</h4>
                      <p className="text-sm text-muted-foreground">Tarjeta, PSE, Nequi, Bancolombia, Efecty y más.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Confirmación inmediata</h4>
                      <p className="text-sm text-muted-foreground">Recibirás confirmación de tu pago y nos pondremos en contacto.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Security Info */}
              <div className="bg-secondary/30 rounded-2xl p-8">
                <div className="text-primary mb-6">
                  <Lock />
                </div>
                <h3 className="text-2xl font-bold mb-4">Pago 100% Seguro</h3>
                <p className="text-muted-foreground mb-6">
                  Wompi es la pasarela de pagos más segura de Colombia, respaldada por Bancolombia.
                  Tu información financiera está protegida con los más altos estándares de seguridad.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield />
                    <span className="text-sm">Encriptación SSL de 256 bits</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield />
                    <span className="text-sm">Certificación PCI DSS</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield />
                    <span className="text-sm">Respaldado por Bancolombia</span>
                  </div>
                </div>

                {/* Wompi Badge */}
                <div className="mt-8 p-4 bg-background/50 rounded-xl">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <WompiLogo />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Pagos seguros con Wompi</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para <span className="text-gradient-cyan">transformar</span> tu infraestructura?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Agenda una llamada gratuita de 30 minutos y descubre cómo podemos acelerar tu negocio.
          </p>
          <Button
            className="btn-primary text-primary-foreground font-semibold px-10 py-6 text-lg"
            onClick={() => window.open('https://wa.me/573114366027?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20llamada%20gratuita%20para%20conocer%20m%C3%A1s%20sobre%20sus%20servicios%20DevOps', '_blank')}
          >
            <Mail />
            Agendar Llamada Gratis
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                <Terminal />
              </div>
              <span className="text-lg font-bold">DevOps<span className="text-primary">Pro</span></span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Términos</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacidad</a>
              <a
                href="#"
                className="hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://wa.me/573114366027', '_blank');
                }}
              >
                Contacto
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 DevOpsPro. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
