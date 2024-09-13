export interface Header {
  ok: boolean;
  status: number;
  statusText: string;
  errMessage: string;
}

export interface Response {
  header: Header;
  data: WorksData[] | BlogData[];
}

export interface WorksData {
  id: string;
  title: string;
  description: string;
  technologies: string;
  schedule: string;
  img: string;
}

export interface Works {
  header: Header;
  data: WorksData[];
}

export interface BlogData {
  id: string;
  title: string;
  body: string;
  datetime: string;
  img1: string;
  img2: string;
  img3: string;
}

export interface Blog {
  header: Header;
  data: BlogData[];
}
