import { ZonaDto } from './zona-dto';
import { AreaDto } from './area-dto';
import { NucleoDto } from './nucleo-dto';

export class ParamentroRelatorioDto {

    nomeRelatorio: string;
    idZona: string;
    idNucleo: string;
    idArea: string;
    ano: number;
    anoInicio: number;
    anoFim: number;
    mesInicio: number;
    mesFim: number;
    zona: ZonaDto;
    nucleo: NucleoDto;
    area: AreaDto;

    //
    zonas: [];
    nucleos: [];
    areas: [];
    anos: [];

}