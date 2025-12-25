import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
};

type PropType = {
  testimonials: Testimonial[];
  options?: EmblaOptionsType;
};

const TestimonialCarousel: React.FC<PropType> = (props) => {
  const { testimonials, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial, i) => (
            <div className="flex-shrink-0 flex-grow-0 w-full min-w-0 pl-4" key={i}>
                <Card className="bg-gray-900/50 backdrop-blur-sm flex flex-col h-full">
                    <CardContent className="pt-6 flex-grow flex flex-col justify-between">
                        <div>
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, j) => (
                                    <Star key={j} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <p className="italic text-gray-300 text-lg">"{testimonial.quote}"</p>
                        </div>
                        <div className="p-6 pt-4 flex items-center gap-4 mt-4">
                            <Avatar>
                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{testimonial.name}</p>
                                <p className="text-sm text-gray-400">{testimonial.title}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-6">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 w-2 rounded-full mx-1 transition-all duration-300 ${
              index === selectedIndex ? 'bg-white w-4' : 'bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
