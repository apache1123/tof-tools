export interface Persistable<TObjectDTO> {
  copyFromDTO(dto: TObjectDTO): void;
  toDTO(): TObjectDTO;
}
