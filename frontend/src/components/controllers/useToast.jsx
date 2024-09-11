import React from "react";
import { useSnackbar, VariantType } from "notistack";

const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showToast = (variant, message, key, duration) => {
    const toastKey = enqueueSnackbar(message, {
      variant, 
      key,
      persist: !!key, 
      preventDuplicate: true,  
      anchorOrigin: {
        horizontal: "right",  
        vertical: "top",  
      },
      autoHideDuration: key ? null : duration || 500,  // If key is provided, disable auto-hide
    });

    return toastKey;  
  };

  const dismissToast = (key) => {
    closeSnackbar(key);  
  };

  return { showToast, dismissToast };
};

export default useToast;
