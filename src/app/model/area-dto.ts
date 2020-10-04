import { NucleoDto } from './nucleo-dto';
import { NamedModel } from './named-model';

export class AreaDto extends NamedModel {

    id: number;
    nucleo: NucleoDto

}
