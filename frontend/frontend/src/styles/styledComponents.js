import {createGlobalStyle} from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap');

  :root {
    --ink-900: #102433;
    --ink-700: #2f4555;
    --ink-500: #567083;
    --bg-100: #fdf9f2;
    --bg-200: #fff3dc;
    --card: #ffffff;
    --accent-500: #f26d3d;
    --accent-600: #db5e30;
    --mint-500: #3f9f85;
    --rose-500: #be4f48;
    --border: #e9d8bb;
    --shadow: 0 14px 36px rgba(16, 36, 51, 0.12);
    --radius-lg: 18px;
    --radius-md: 12px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    min-height: 100%;
  }

  body {
    min-height: 100vh;
    font-family: 'Manrope', sans-serif;
    color: var(--ink-900);
    background:
      radial-gradient(circle at 12% 10%, rgba(242, 109, 61, 0.22), transparent 30%),
      radial-gradient(circle at 90% 15%, rgba(63, 159, 133, 0.22), transparent 34%),
      linear-gradient(135deg, var(--bg-100), var(--bg-200));
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`
