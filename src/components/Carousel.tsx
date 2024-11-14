import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Box, Button } from "@mui/material";

interface CarouselProps {
  cards: React.ReactNode[]; // ou JSX.Element[]
}

const Carousel: React.FC<CarouselProps> = ({ cards }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Box>
      <Box ref={emblaRef} sx={{ overflow: "hidden", width: "100%" }}>
        <Box sx={{ display: "flex" }}>
          {cards.map((card, index) => (
            <Box
              key={index}
              sx={{
                flex: "0 0 100%",
                boxSizing: "border-box",
              }}
            >
              {card}
            </Box>
          ))}
        </Box>
      </Box>
      {cards.length > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          {cards.map((_, index) => (
            <Button
              key={index}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
              sx={{
                width: "10px",
                height: "10px",
                minWidth: 0,
                borderRadius: "50%",
                margin: "0 4px",
                backgroundColor: selectedIndex === index ? "primary.main" : "#ccc",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Carousel;
