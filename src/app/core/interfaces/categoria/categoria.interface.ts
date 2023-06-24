export interface Categoria {
    id: number;
    nombre: string;
    descripcion: string;
}

export type GuardaCategoriaRequest = Omit<Categoria, 'id'>;
