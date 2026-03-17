export interface FeatureCardProps {
  image: string;
  alt: string;
  title: string;
  description: string;
}

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  banned?: boolean | null;
  role?: string | null;
  banReason?: string | null;
  banExpires?: Date | null;
}

export interface Session {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  impersonatedBy?: string | null;
}

export interface AuthData {
  user: User;
  session: Session;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface HamburgerMenuProps {
  isSheetOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
  isPending: boolean;
  data: AuthData | null;
  renderNavItems: (items: NavItem[]) => React.ReactNode;
  loggedInNavItems: NavItem[];
  navItems: NavItem[];
}

export interface UploadedAsset {
  url: string;
  secureUrl: string;
  publicId: string;
  resourceType: string;
  originalFilename: string;
}
