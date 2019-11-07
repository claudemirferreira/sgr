import { AreaDto } from './area-dto';
import { NucleoDto } from './nucleo-dto';
import { ZonaDto } from './zona-dto';

export class FiltroDto {
    ano: number;
    anoInicio: number;
    anoFim: number;
    zona: ZonaDto;
    nucleo: NucleoDto;
    area: AreaDto;
    nomeRelatorio: string;

    zonas:[];
    nucleos:[];
    areas:[];
    anos: [];

}