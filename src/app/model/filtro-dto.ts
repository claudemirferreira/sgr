import { AreaDto } from './area-dto';
import { NucleoDto } from './nucleo-dto';
import { ZonaDto } from './zona-dto';
import { Mes } from './mes';

export class FiltroDto {
    
    membro: string;
    ano: number;
    anoInicio: number;
    anoFim: number;
    zona: ZonaDto;
    nucleo: NucleoDto;
    area: AreaDto;
    nomeRelatorio: string;

    mesInicio: Mes;
    mesFim: Mes;
    
    zonas:[];
    nucleos:[];
    areas:[];
    anos: [];

}