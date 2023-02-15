import "styled-components";
import { TYPOGRAPHY } from "styles/typography";

import { COLORS } from "../styles";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof COLORS;
    typography: typeof TYPOGRAPHY;
  }
}
