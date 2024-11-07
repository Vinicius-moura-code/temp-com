import { useState } from "react";
import ReactPlayer from "react-player";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

type VideoPlayerProps = {
  videoUrl: string;
  thumbnailUrl: string; // Adicionando a URL da miniatura
};

export function VideoPlayer({ videoUrl, thumbnailUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isDsktop = useMediaQuery(theme.breakpoints.down("xl"));
  const isNotebook = useMediaQuery(theme.breakpoints.up("sm"));

  const sizeNotebook = isDsktop && isNotebook;

  const [showControls, setShowControls] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        margin: "0 auto",
        borderRadius: 2,
        overflow: "hidden",
        background: "#15959E26",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => !isPlaying && setShowControls(false)}
    >
      {/* ReactPlayer Component */}
      <ReactPlayer
        url={videoUrl}
        playing={isPlaying}
        volume={0.2}
        controls={false}
        width="100%"
        height={sizeNotebook ? 350 : !isMobile ? 647 : 387}
        onClick={togglePlayPause}
      />

      {/* Thumbnail Overlay */}
      {!isPlaying && (
        <Box
          onClick={togglePlayPause}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: "pointer",
            zIndex: 1,
          }}
        />
      )}

      {/* Play/Pause Button */}
      <IconButton
        onClick={togglePlayPause}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          borderRadius: "50%",
          backgroundColor: "#F68B1F",
          padding: "12px",
          opacity: isPlaying ? 0 : 1,
          transition: "opacity 0.3s ease",
          zIndex: 2,
        }}
      >
        {isPlaying && !showControls ? (
          <PauseIcon fontSize="large" />
        ) : (
          <PlayArrowIcon fontSize="large" />
        )}
      </IconButton>

    </Box>
  );
}
