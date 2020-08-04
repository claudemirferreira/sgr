import { NamedModel } from './named-model';
import { ZonaDto } from './zona-dto';

export class NucleoDto extends NamedModel {

    id: number;
    zona= new ZonaDto();

}
