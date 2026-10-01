export type WordpressPost = {
  id: number;
  link: string;
  title: {
    rendered: string;
  };
  jetpack_featured_media_url?: string;
};

export type ProgramItem = {
  id: string;
  nombre: string;
  locutor: string;
  horario: string;
  imagen: string;
  link: string;
};
