import { useRef, useState } from "react";
import { Box, IconButton, Slider, Tooltip } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { pxToRem } from "../theme/typography";
import useResponsive from "../hooks/useResponsive";
//import Thumb from "assets/thumbVideo.png"

export function VideoPlayer({ videoUrl }: { videoUrl: string }) {
  const isMobile = useResponsive("down", "sm");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showControls, setShowControls] = useState(false);
  // const [currentTime, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0);

  // useEffect(() => {
  //   if (videoRef.current) {
  //     const updateTime = () => {
  //       setCurrentTime(videoRef.current?.currentTime ?? 0);
  //       setDuration(videoRef.current?.duration ?? 0);
  //     };

  //     videoRef.current.addEventListener("timeupdate", updateTime);
  //     videoRef.current.addEventListener("loadedmetadata", updateTime);

  //     return () => {
  //       videoRef.current?.removeEventListener("timeupdate", updateTime);
  //       videoRef.current?.removeEventListener("loadedmetadata", updateTime);
  //     };
  //   }
  // }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    if (videoRef.current) {
      const newVolume = Array.isArray(newValue) ? newValue[0] : newValue;
      videoRef.current.volume = newVolume / 100;
      setVolume(newVolume);
    }
  };

  // const handleProgressChange = (event: Event, newValue: number | number[]) => {
  //   if (videoRef.current) {
  //     const newTime = Array.isArray(newValue) ? newValue[0] : newValue;
  //     videoRef.current.currentTime = newTime;
  //     setCurrentTime(newTime);
  //   }
  // };

  return (
    <Box
    sx={{
      position: "relative",
      width: "100%",
      height: isPlaying ? "auto" : isMobile? "auto": pxToRem(387),
      margin: "0 auto",
      borderRadius: pxToRem(35.39),
      overflow: "hidden",
      background: "#15959E26",
      display: "flex",
      alignItems: "center",
      justifyContent: "center", 
    }}
    onMouseEnter={() => setShowControls(true)}
    onMouseLeave={() => !isPlaying && setShowControls(false)}
  >
    <video
      ref={videoRef}
      width="100%"
      height="100%"
      controls={false}
      autoPlay={false}
      preload="metadata"
      style={{
        objectFit: "cover",
        margin: 0,
        padding: 0,
        border: "none",
        boxSizing: "border-box",
      }}
      onClick={togglePlayPause}

      poster="assets/thumbVideo.png"
    >
      <source src={videoUrl} type="video/mp4" />
      Seu navegador não suporta a reprodução deste vídeo.
    </video>
  
    {/* Botão de Play/Pause */}
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
      {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
    </IconButton>
  
    {/* Controle de volume e ícone */}
    {showControls && (
      <Box
        sx={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          zIndex: 2,
        }}
      >
        <Tooltip title="Volume">
          <IconButton>
            {volume === 0 ? <VolumeOffIcon sx={{ color: "#fff" }} /> : <VolumeUpIcon sx={{ color: "#fff" }} />}
          </IconButton>
        </Tooltip>
        <Slider
          value={volume}
          onChange={handleVolumeChange}
          aria-labelledby="volume-slider"
          sx={{
            color: "#fff",
            width: "100px",
          }}
        />
      </Box>
    )}
  </Box>
  );
}
