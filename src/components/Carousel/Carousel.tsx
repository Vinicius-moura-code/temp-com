import { ReactNode, useCallback, useEffect, useState } from "react";
import EmblaCarousel from "embla-carousel-react";
import "./Carousel.css";
import { Box, Button } from "@mui/material";

interface propsCarousel{
  content: ReactNode[]
}


const Carousel = (prop: propsCarousel) => {
  const [emblaRef, emblaApi] = EmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onResize = useCallback(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", onSelect);
    }
  }, [emblaApi, onSelect]);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi]);

  return (
    <Box component="div" className="embla" ref={emblaRef}>
      <Box component="div" className="embla__container">
        {prop.content.map((card, index) => (
          <Box component="div" className="embla__slide" key={index}>
             {card}
          </Box>
        ))}
      </Box>

      {/* Adicionar os dots */}
      <Box component="div" className="embla__dots">
        {prop.content.map((_, index) => (
          <Button
            key={index}
            onClick={() => scrollTo(index)}
            sx={{
              minWidth: 16,
              minHeight: 16,
              borderRadius: "50%",
              background: selectedIndex === index ? "#3677E0" : "#ddd",
              margin: "0 8px",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Carousel;
