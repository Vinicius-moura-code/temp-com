import { CircularProgress, Box, Typography } from '@mui/material';
import { pxToRem } from '../../../theme/typography';

const ProgressoDias = () => {
  const valorProgresso = 70; // Valor do progresso

  return (
    <Box position="relative" display="inline-flex">
      {/* CircularProgress para o track com cor preta */}
      <CircularProgress
        variant="determinate"
        value={100} // Track completo (sem progresso)
        size={100}
        thickness={2} // Espessura do track
        sx={{
          color: '#000000', // Cor preta para o track
          opacity: 0.2, // Deixa o track mais suave (transparência)
        }}
      />
      {/* CircularProgress com cor azul para o progresso */}
      <CircularProgress
        variant="determinate"
        value={valorProgresso}
        size={100} // Tamanho do círculo
        thickness={2} // Espessura mais fina
        sx={{
          color: '#3b82f6', // Cor do progresso (azul)
          position: 'absolute', // Sobrepor sobre o track
          left: 0, // Garantir alinhamento na sobreposição
        }}
      />
      
      {/* Texto centralizado dentro do círculo */}
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography variant="h6" component="p" color="primary" sx={{
            fontSize: pxToRem(16),
            fontWeight: 800,
            lineHeight: pxToRem(20)
        }}>
          10
        </Typography>

        <Typography variant="body2" component="p" color="primary" ml={1} sx={{
            fontSize: pxToRem(16),
            fontWeight: 800,
            lineHeight: pxToRem(20)
        }}>
          Dias
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressoDias;
