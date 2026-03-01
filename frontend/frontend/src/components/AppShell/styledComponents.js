import {NavLink} from 'react-router-dom'
import {styled} from 'styled-components'
import {GhostButton} from '../shared/styledComponents'

export const Shell = styled.div`
  width: min(1100px, calc(100% - 2rem));
  margin: 1.5rem auto;

  @media (max-width: 760px) {
    width: calc(100% - 1rem);
    margin: 0.5rem auto 1rem;
  }
`

export const TopBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 1.4rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.96),
    rgba(255, 247, 232, 0.95)
  );
  box-shadow: var(--shadow);

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: start;
  }
`

export const BrandEyebrow = styled.p`
  margin: 0;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--ink-500);
`

export const BrandTitle = styled.h1`
  margin: 0.2rem 0 0;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1.35rem;
`

export const LogoutButton = styled(GhostButton)`
  align-self: center;
`

export const Navigation = styled.nav`
  margin-top: 0.9rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
`

export const NavItem = styled(NavLink)`
  border-radius: 999px;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(16, 36, 51, 0.15);
  background-color: rgba(255, 255, 255, 0.55);
  color: var(--ink-700);
  font-size: 0.92rem;
  font-weight: 700;
  transition: all 180ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: var(--accent-500);
  }

  &.active {
    color: #ffffff;
    border-color: var(--accent-500);
    background: linear-gradient(110deg, var(--accent-500), #ef8a49);
  }
`

export const Content = styled.main`
  margin-top: 1.1rem;
`
