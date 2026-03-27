"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Loader2, CheckCircle2, Code2, Rocket, GraduationCap, Globe, Coffee, ArrowLeft, HeartHandshake } from "lucide-react";

// Expanded Inquiry Options with Icons and Context
const INQUIRY_TYPES = [
  { id: "freelance", label: "Freelance Project", desc: "Build a high-performance web app.", icon: Code2, color: "hover:border-blue-500/50 hover:bg-blue-500/10" },
  { id: "startup", label: "Startup Advisory", desc: "Technical architecture & scaling.", icon: Rocket, color: "hover:border-purple-500/50 hover:bg-purple-500/10" },
  { id: "internship", label: "Internship", desc: "Looking to join your engineering team.", icon: GraduationCap, color: "hover:border-emerald-500/50 hover:bg-emerald-500/10" },
  { id: "mentorship", label: "Mentorship", desc: "Guidance on frontend & design.", icon: HeartHandshake, color: "hover:border-rose-500/50 hover:bg-rose-500/10" },
  { id: "opensource", label: "Open Source", desc: "Collaborate on public tooling.", icon: Globe, color: "hover:border-zinc-500/50 hover:bg-zinc-500/10" },
  { id: "coffee", label: "Just saying Hi", desc: "Let's grab a virtual coffee.", icon: Coffee, color: "hover:border-amber-500/50 hover:bg-amber-500/10" },
] as const;

const formSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Invalid email address."),
  inquiryType: z.string(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  // Two-step form state
  const [selectedInquiry, setSelectedInquiry] = useState<typeof INQUIRY_TYPES[number] | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "", inquiryType: "" },
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSelectInquiry = (inquiry: typeof INQUIRY_TYPES[number]) => {
    setSelectedInquiry(inquiry);
    setValue("inquiryType", inquiry.id);
  };

  const handleBack = () => {
    setSelectedInquiry(null);
    setValue("inquiryType", "");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    try {
      if (!WEB3FORMS_KEY) {
        console.warn("No Web3Forms key provided. Simulating success.");
        await new Promise(res => setTimeout(res, 2000));
        setIsSubmitted(true);
        reset();
        return;
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          ...values,
          inquiryLabel: selectedInquiry?.label
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        reset();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative py-32 md:py-48 bg-background min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Subtle Interactive Spotlight */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.1] transition-opacity duration-1000"
        animate={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.4), transparent 40%)`
        }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 premium-grid" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="h-px w-8 bg-muted-foreground/50" />
              <span className="uppercase tracking-widest text-xs font-mono text-muted-foreground">04 / Collaborate</span>
              <span className="h-px w-8 bg-muted-foreground/50" />
            </div>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-[-0.04em] leading-tight">
              Start a Conversation.
            </h2>
          </motion.div>

          <AnimatePresence mode="wait">
            {!selectedInquiry && !isSubmitted && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-8 text-center">
                  <p className="text-xl text-muted-foreground font-light">How can I help you today?</p>
                </div>
                
                {/* Bento Box Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {INQUIRY_TYPES.map((type, i) => {
                    const Icon = type.icon;
                    return (
                      <motion.button
                        key={type.id}
                        onClick={() => handleSelectInquiry(type)}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`group flex flex-col items-start text-left p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all duration-500 cursor-pointer ${type.color}`}
                      >
                        <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">{type.label}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{type.desc}</p>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {selectedInquiry && !isSubmitted && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl mx-auto"
              >
                <button 
                  onClick={handleBack}
                  className="group flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-white transition-colors mb-12"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to options
                </button>

                <div className="mb-12">
                  <div className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-medium mb-6 backdrop-blur-md">
                    Discussing: {selectedInquiry.label}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
                    Tell me the details.
                  </h3>
                  <p className="text-muted-foreground text-lg">Leave your contact info and project requirements below.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="relative group/input">
                      <input 
                        {...register("name")} 
                        id="name"
                        placeholder=" "
                        onFocus={() => setFocusedInput("name")}
                        onBlur={() => setFocusedInput(null)}
                        className="peer w-full bg-transparent border-0 border-b border-white/20 py-4 text-2xl font-light text-white outline-none transition-colors focus:border-white" 
                      />
                      <label htmlFor="name" className="absolute left-0 top-4 text-2xl text-muted-foreground/50 transition-all duration-300 pointer-events-none peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white peer-[:not(:placeholder-shown)]:font-mono peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest">
                        Full Name
                      </label>
                      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-500 peer-focus:w-full group-hover/input:w-1/4" />
                      {errors.name && <p className="text-red-400 text-sm mt-3">{errors.name.message}</p>}
                    </div>
                    
                    <div className="relative group/input">
                      <input 
                        {...register("email")} 
                        id="email"
                        type="email" 
                        placeholder=" "
                        onFocus={() => setFocusedInput("email")}
                        onBlur={() => setFocusedInput(null)}
                        className="peer w-full bg-transparent border-0 border-b border-white/20 py-4 text-2xl font-light text-white outline-none transition-colors focus:border-white" 
                      />
                      <label htmlFor="email" className="absolute left-0 top-4 text-2xl text-muted-foreground/50 transition-all duration-300 pointer-events-none peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white peer-[:not(:placeholder-shown)]:font-mono peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest">
                        Email Address
                      </label>
                      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-500 peer-focus:w-full group-hover/input:w-1/4" />
                      {errors.email && <p className="text-red-400 text-sm mt-3">{errors.email.message}</p>}
                    </div>
                  </div>
                  
                  {/* Message Area */}
                  <div className="relative group/input">
                    <textarea
                      {...register("message")}
                      id="message"
                      placeholder=" "
                      onFocus={() => setFocusedInput("message")}
                      onBlur={() => setFocusedInput(null)}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      className="peer w-full bg-transparent border-0 border-b border-white/20 py-4 text-2xl font-light text-white outline-none transition-colors focus:border-white min-h-[120px] resize-none overflow-hidden"
                    />
                    <label htmlFor="message" className="absolute left-0 top-4 text-2xl text-muted-foreground/50 transition-all duration-300 pointer-events-none peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white peer-[:not(:placeholder-shown)]:font-mono peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest">
                      Your Message
                    </label>
                    <div className="absolute bottom-1 left-0 h-[1px] w-0 bg-white transition-all duration-500 peer-focus:w-full group-hover/input:w-1/4" />
                    {errors.message && <p className="text-red-400 text-sm mt-3">{errors.message.message}</p>}
                  </div>
                  
                  {/* Submit Button */}
                  <div className="pt-8">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-white text-black font-medium text-lg hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {isSubmitted && (
              <motion.div 
                key="step-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-5xl md:text-7xl font-medium mb-6 tracking-tight">Transmission <br/> Successful.</h3>
                <p className="text-muted-foreground text-xl font-light max-w-md mx-auto mb-12">
                  Thank you for reaching out. I've received your {selectedInquiry?.label.toLowerCase()} inquiry and will reply within 24 hours.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
