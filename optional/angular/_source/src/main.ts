import { bootstrapApplication } from '@angular/platform-browser'

import { Catalog } from './app/catalog'

bootstrapApplication(Catalog).catch((error) => console.error(error))
