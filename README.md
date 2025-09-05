# Angular playground

### Demo

1. `npm install`
2. `ng serve`
3. Then open http://localhost:4200/

### Components

* [Progress Component](src/app/components/progress/progress.component.ts)
* [Grid Component](src/app/components/grid/grid.component.ts)
  * Kept the component dumb, it receives "API" items data from `ItemsService` + pagination information to render `PaginationComponent`
  * Initially had the loading of items inside, but had to move it outside due to not knowing the "loading" state
  * I would have added `ProgressComponent` to `GridComponent` but it complicates the code a bit (simulating 0-100 progress)
