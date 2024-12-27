import debounce from "lodash/debounce";
import { useEffect, useState } from "react";

type DeviceType = "mobile" | "tablet" | "desktop" | undefined;

type UseResponsiveProps = {
  defaultUndefined?: boolean;
};

const maxBreakpoints = {
  mobile: 768,
  tablet: 1024,
};

const getDeviceType = (width: number): DeviceType => {
  if (width < maxBreakpoints.mobile) {
    return "mobile";
  } else if (width >= maxBreakpoints.mobile && width < maxBreakpoints.tablet) {
    return "tablet";
  } else {
    return "desktop";
  }
};

const useResponsive = (props: UseResponsiveProps = {}): DeviceType => {
  const { defaultUndefined = false } = props;
  const [device, setDevice] = useState<DeviceType>(defaultUndefined ? undefined : "mobile");

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      setDevice(getDeviceType(width));
    };

    // Debounced resize handler to avoid too many re-renders
    const handleResize = debounce(updateDeviceType, 150);

    updateDeviceType(); // Set the initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel(); // Cancel any pending debounced calls
    };
  }, []);

  return device;
};

export default useResponsive;
