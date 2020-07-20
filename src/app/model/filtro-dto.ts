import { AreaDto } from './area-dto';
import { NucleoDto } from './nucleo-dto';
import { ZonaDto } from './zona-dto';
import { Mes } from './mes';

export class FiltroDto {

    membro: string;
    ano: number;
    anoInicio: number;
    anoFim: number;
    zona : ZonaDto = new ZonaDto();
    nucleo : NucleoDto = new NucleoDto();
    area : AreaDto = new AreaDto();
    nomeRelatorio: string;
    idMembro: number;

    mesInicio: Mes;
    mesFim: Mes;

    zonas: ZonaDto[];
    nucleos: NucleoDto[];
    areas: AreaDto[];
    anos: [];
    meses: Mes[];
}
