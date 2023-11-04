export interface Persistable<TObjectDto> {
  copyFromDto(dto: TObjectDto): void;
  toDto(): TObjectDto;
}
