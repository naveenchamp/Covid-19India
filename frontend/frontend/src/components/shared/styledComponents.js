import {styled, css} from 'styled-components'

const buttonBaseStyles = css`
  border: 0;
  border-radius: 999px;
  padding: 0.6rem 1rem;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: transform 160ms ease, opacity 160ms ease;
  width: fit-content;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }
`

export const Page = styled.section`
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--card);
  padding: 1.2rem;
  box-shadow: var(--shadow);
  animation: rise-in 260ms ease-out;

  @keyframes rise-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const SectionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: start;
  }
`

export const SectionEyebrow = styled.p`
  margin: 0;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--ink-500);
`

export const PageTitle = styled.h2`
  margin: 0.2rem 0 0;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
`

export const PageSubtitle = styled.p`
  margin: 0.3rem 0 0;
  color: var(--ink-500);
  font-size: 0.95rem;
`

export const Panel = styled.div`
  border: 1px solid #efdfc4;
  border-radius: var(--radius-md);
  padding: 0.95rem;
  background-color: #fffaf0;
`

export const FormGrid = styled.form`
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`

export const Field = styled.label`
  display: grid;
  gap: 0.38rem;
`

export const FieldLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--ink-700);
`

export const inputStyles = css`
  height: 42px;
  border-radius: var(--radius-md);
  border: 1px solid #d2c4ac;
  background-color: #fffdf7;
  padding: 0 0.8rem;
  font: inherit;
  color: var(--ink-900);

  &:focus {
    outline: none;
    border-color: var(--accent-500);
    box-shadow: 0 0 0 3px rgba(242, 109, 61, 0.18);
  }
`

export const TextInput = styled.input`
  ${inputStyles}
`

export const SelectInput = styled.select`
  ${inputStyles}
`

export const PrimaryButton = styled.button`
  ${buttonBaseStyles}
  color: #ffffff;
  background: linear-gradient(110deg, var(--accent-500), #ef8a49);
`

export const GhostButton = styled.button`
  ${buttonBaseStyles}
  color: var(--ink-900);
  background-color: #f2ede4;
`

export const DangerButton = styled.button`
  ${buttonBaseStyles}
  color: #ffffff;
  background-color: var(--rose-500);
`

export const StatusMessage = styled.p`
  margin: 0.9rem 0 0;
  padding: 0.7rem 0.85rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  background-color: #f2efe8;
  color: var(--ink-700);

  ${({$variant}) =>
    $variant === 'error' &&
    css`
      background-color: #f6dfdd;
      color: #7e2f2b;
    `}

  ${({$variant}) =>
    $variant === 'success' &&
    css`
      background-color: #dff2ec;
      color: #1f6f5a;
    `}
`

export const MutedText = styled.p`
  margin: 0;
  color: var(--ink-500);
  font-size: 0.84rem;
`

export const PrimaryLinkStyle = css`
  ${buttonBaseStyles}
  color: #ffffff;
  background: linear-gradient(110deg, var(--accent-500), #ef8a49);
`

export const GhostLinkStyle = css`
  ${buttonBaseStyles}
  color: var(--ink-900);
  background-color: #f2ede4;
`
