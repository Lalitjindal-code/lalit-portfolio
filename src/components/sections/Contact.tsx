"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setErrorMsg("");

    const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    try {
      if (!WEB3FORMS_KEY) {
        // Fallback simulation if no key provided
        console.warn("No Web3Forms key provided. Simulating success frontend-only.");
        await new Promise(res => setTimeout(res, 1500));
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
        return;
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          ...values,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setErrorMsg(result.message || "Failed to send. Please try again later.");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 md:py-48 overflow-hidden bg-white/[0.01]">
      <div className="container mx-auto px-6 md:px-12 flex flex-col xl:flex-row gap-20 xl:gap-32">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="xl:w-5/12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-8 bg-muted-foreground/50" />
            <span className="uppercase tracking-widest text-xs font-mono text-muted-foreground">04 / Contact</span>
          </div>
          <h2 className="text-5xl md:text-[80px] font-semibold tracking-[-0.04em] mb-8 leading-[0.9]">
            Let's build <br />
            <span className="text-muted-foreground">the future.</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-light leading-relaxed max-w-md">
            Currently accepting select opportunities. If you require deep technical expertise and high-end design, we should talk.
          </p>
          <div className="space-y-4 font-mono text-sm text-muted-foreground">
            <a href="mailto:hello@lalit.dev" className="flex items-center gap-2 hover:text-white transition-colors w-fit group">
              hello@lalit.dev
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <p>Based in San Francisco / Remote</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="xl:w-7/12"
        >
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 border border-white/10 rounded-3xl bg-white/[0.02] backdrop-blur-md"
            >
              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-3xl font-medium mb-4">Inquiry Sent</h3>
              <p className="text-muted-foreground text-lg font-light">I'll get back to you within 24-48 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 border border-white/10 p-8 md:p-12 rounded-3xl bg-white/[0.02] backdrop-blur-sm">
              <div className="relative">
                <input 
                  {...register("name")} 
                  id="name"
                  placeholder=" "
                  className="block w-full border-0 border-b border-white/20 bg-transparent py-4 text-xl focus:ring-0 focus:border-white transition-colors peer" 
                />
                <label htmlFor="name" className="absolute left-0 top-4 text-xl text-muted-foreground transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white cursor-text">
                  Your Name
                </label>
                {errors.name && <p className="text-destructive text-sm mt-3">{errors.name.message}</p>}
              </div>
              
              <div className="relative">
                <input 
                  {...register("email")} 
                  id="email"
                  type="email" 
                  placeholder=" "
                  className="block w-full border-0 border-b border-white/20 bg-transparent py-4 text-xl focus:ring-0 focus:border-white transition-colors peer" 
                />
                <label htmlFor="email" className="absolute left-0 top-4 text-xl text-muted-foreground transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white cursor-text">
                  Email Address
                </label>
                {errors.email && <p className="text-destructive text-sm mt-3">{errors.email.message}</p>}
              </div>
              
              <div className="relative">
                <textarea
                  {...register("message")}
                  id="message"
                  placeholder=" "
                  className="block w-full border-0 border-b border-white/20 bg-transparent py-4 text-xl focus:ring-0 focus:border-white transition-colors peer min-h-[120px] resize-none"
                />
                <label htmlFor="message" className="absolute left-0 top-4 text-xl text-muted-foreground transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white cursor-text">
                  Tell me about your project
                </label>
                {errors.message && <p className="text-destructive text-sm mt-3">{errors.message.message}</p>}
              </div>
              
              {errorMsg && <p className="text-destructive text-sm">{errorMsg}</p>}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden w-full md:w-auto justify-center"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Send Inquiry</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
