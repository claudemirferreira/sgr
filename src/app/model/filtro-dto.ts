import { AreaDto } from './area-dto';
import { NucleoDto } from './nucleo-dto';
import { ZonaDto } from './zona-dto';
import { Mes } from './mes';

export class FiltroDto {
    
    membro: string;
    ano: number;
    anoInicio: number;
    anoFim: number;
    zona = new ZonaDto();
    nucleo = new NucleoDto();
    area = new AreaDto();
    nomeRelatorio: string;
    idMembro: number;

    mesInicio: Mes;
    mesFim: Mes;
    
    zonas:[];
    nucleos:[];
    areas:[];
    anos: [];

}