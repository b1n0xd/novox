import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marie L.",
      text: "L'équipe de Misad s'occupe de ma mère depuis 2 ans. Leur professionnalisme et leur gentillesse nous ont vraiment rassurés. Je recommande vivement leurs services.",
      initials: "ML",
    },
    {
      name: "Jean-Pierre D.",
      text: "Après mon opération, j'ai bénéficié de soins quotidiens à domicile. Les infirmières étaient toujours à l'heure, attentives et compétentes. Merci pour tout !",
      initials: "JPD",
    },
    {
      name: "Sophie M.",
      text: "Un service exceptionnel ! L'équipe est stable, nous avons toujours les mêmes infirmières ce qui crée une vraie relation de confiance. Disponibles 7j/7 comme promis.",
      initials: "SM",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Témoignages de nos patients
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ce que nos patients disent de nos services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="border-none shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2 bg-card animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <Quote className="h-10 w-10 text-secondary opacity-50" />
                <p className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3 pt-4">
                  <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Patient Misad
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
