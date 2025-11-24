export interface MenuItem {
  id: number;
  parentId: number | null;
  title: string;
  route: string;
  icon: string;
  children: MenuItem[];
}