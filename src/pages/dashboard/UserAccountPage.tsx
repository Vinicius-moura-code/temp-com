import {
  Box,
  Link,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Helmet } from "react-helmet-async";
import { pxToRem } from "../../theme/typography";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import PasswordChangedModal from "../../section/user/PasswordChangedModal";
import ChangePasswordModal from "../../section/user/ChangePasswordModal";
import axiosInstance from "../../utils/axios";
import {
  CellOrTelephoneField,
  CpfOrCnpjField,
} from "../../components/FormComponents";

interface User {
  user: MyAccount;
}

interface MyAccount {
  displayName: string;
  email: string;
  photoURL: string;
  phone: string;
  cnpj: string;
  RazaoSocial: string;
  address: Address;
  passwordLastChanged: string;
}

interface Address {
  city: string;
  complement: string;
  id: string;
  lastSync: string;
  neighborhood: string;
  number: string;
  state: string;
  street: string;
  zipcode: string;
}

export default function UserAccountPage() {
  const [open, setOpen] = useState(false);
  const [myAccount, setMyAccount] = useState<MyAccount | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  const [openPasswordChanged, setOpenPasswordChanged] = useState(false);
  const handleCloseModal = () => setOpen(false);

  const handleFirstModalSubmit = () => {
    setOpen(false);
    setOpenPasswordChanged(true);
  };

  useEffect(() => {
    getMyAccount();
  }, []);

  const getMyAccount = async () => {
    try {
      const response = await axiosInstance.get<User>("/v1/account/my-account");
      setMyAccount(response.data.user);
    } catch (error) {
      console.error("Erro ao buscar dados da conta:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const getAddress = (): string => {
    const address = myAccount?.address;
    return `${address?.street ?? ''} ${address?.number ?? ''}, ${address?.neighborhood ?? ''}, ${address?.city ?? ''}, ${address?.state ?? ''}${address?.zipcode ? ` - CEP ${address.zipcode}` : ''}`.trim();
  };

  return (
    <>
      <Helmet>
        <title>Dados cadastrais</title>
      </Helmet>

      <ChangePasswordModal
        open={open}
        onClose={handleCloseModal}
        onSubmit={handleFirstModalSubmit}
      />

      <PasswordChangedModal open={openPasswordChanged} />

      <Box
        sx={{
          background: "#FFFFFF",
          height: "100%",
          padding: {
            md: `${pxToRem(32)} ${pxToRem(40)}`,
            xl: `${pxToRem(32)} ${pxToRem(40)}`,
            xs: `${pxToRem(32)} ${pxToRem(16)}`,
          },
          borderRadius: {
            md: pxToRem(0),
            xl: pxToRem(0),
            xs: pxToRem(24),
          },
        }}
      >
        <Typography
          component="p"
          sx={{
            pb: pxToRem(24),
            color: "#000000",
            fontSize: {
              md: pxToRem(24),
              xl: pxToRem(24),
              xs: pxToRem(20),
            },
            fontWeight: {
              md: 700,
              xl: 700,
              xs: 600,
            },
            lineHeight: pxToRem(40),
          }}
        >
          Dados cadastrais
        </Typography>

        <Grid spacing={4} container>
          <Grid size={{ md: 4, xl: 4, xs: 12 }}>
            <TextField
              fullWidth
              disabled
              id="cpfOuCnpj"
              label="CPF ou CNPJ"
              defaultValue={myAccount?.cnpj?? ''}
              InputProps={{
                inputComponent: CpfOrCnpjField,
              }}
            />
          </Grid>

          <Grid size={{ md: 4, xl: 4, xs: 12 }}>
            <TextField
              fullWidth
              disabled
              id="razaoSocial"
              label="Razão social"
              defaultValue={myAccount?.RazaoSocial?? ''}
            />
          </Grid>

          <Grid size={{ md: 4, xl: 4, xs: 12 }}>
            <TextField
              fullWidth
              disabled
              id="endereco"
              label="Endereço"
              defaultValue={getAddress()}
            />
          </Grid>

          <Grid size={{ md: 4, xl: 4, xs: 12 }}>
            <TextField
              fullWidth
              disabled
              id="responsavel"
              label="Responsável"
              defaultValue={myAccount?.displayName?? ''}
            />
          </Grid>

          <Grid size={{ md: 4, xl: 4, xs: 12 }}>
            <TextField
              fullWidth
              disabled
              id="email"
              label="E-mail"
              defaultValue={myAccount?.email}
            />
          </Grid>

          <Grid size={{ md: 4, xl: 4, xs: 12 }}>
            <TextField
              fullWidth
              disabled
              id="contato"
              label="Contato"
              defaultValue={myAccount?.phone?? ''}
              InputProps={{
                inputComponent: CellOrTelephoneField,
              }}
            />
          </Grid>
        </Grid>

        <Stack direction="column" sx={{ my: 3 }} spacing={3}>
          <Typography
            component="p"
            sx={{
              color: "#000000",
              fontSize: {
                md: pxToRem(24),
                xl: pxToRem(24),
                xs: pxToRem(20),
              },
              fontWeight: {
                md: 700,
                xl: 700,
                xs: 600,
              },
              lineHeight: pxToRem(40),
            }}
          >
            Senha e segurança
          </Typography>

          <DatePicker
            sx={{ width: pxToRem(258.33) }}
            label="Data da última alteração"
            disabled
            defaultValue={dayjs(myAccount?.passwordLastChanged?? '')}
          />

          <Link
            component={RouterLink}
            to=""
            onClick={() => {
              setOpen(true);
            }}
            variant="body2"
            color="inherit"
            underline="always"
            sx={{
              width: pxToRem(150),
              color: "#3677E0",
              fontSize: pxToRem(16),
              fontWeight: 700,
              lineHeight: pxToRem(18),
            }}
          >
            Alterar senha
          </Link>
        </Stack>
      </Box>
    </>
  );
}
