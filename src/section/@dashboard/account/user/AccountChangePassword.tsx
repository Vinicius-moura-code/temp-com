import * as z from "zod";
// form
import { useForm } from "react-hook-form";
// @mui
import { Stack, Card } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// @types
import { IUserAccountChangePassword } from "../../../../types/user";
// components
import Iconify from "../../../../components/iconify";
import { useSnackbar } from "../../../../components/snackbar";
import FormProvider, { RHFTextField } from "../../../../components/hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ----------------------------------------------------------------------

type FormValuesProps = IUserAccountChangePassword;

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();

  const ChangePasswordSchema = z
    .object({
      oldPassword: z.string().min(1, "Old Password is required"),
      newPassword: z.string().min(6, "Password must be at least 6 characters"),
      confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "Passwords don't match",
      path: ["confirmNewPassword"],
    });

  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const methods = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar("Update success!");
      console.log("DATA", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Stack spacing={3} alignItems="flex-end" sx={{ p: 3 }}>
          <RHFTextField
            name="oldPassword"
            type="password"
            label="Old Password"
          />

          <RHFTextField
            name="newPassword"
            type="password"
            label="New Password"
            helperText={
              <Stack component="span" direction="row" alignItems="center">
                <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} />{" "}
                Password must be minimum 6+
              </Stack>
            }
          />

          <RHFTextField
            name="confirmNewPassword"
            type="password"
            label="Confirm New Password"
          />

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
