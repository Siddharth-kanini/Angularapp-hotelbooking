// import { Component } from '@angular/core';
// import { Workout } from '../Workout';
// import { FitnessService } from '../fitness.service';
// import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// @Component({
//   selector: 'app-updatew',
//   templateUrl: './updatew.component.html',
//   styleUrls: ['./updatew.component.css']
// })
// export class UpdatewComponent {
//   work: Workout = {
//     wid: 0,
//     wname: '',
//     trainer: '',
//     intensity: '',
//     wdate: new Date(),
//     duration: '',
//     maingoal: '',
//     exercise: []
//   };
//   wid: number = 0;

//   constructor(
//     private apiser: FitnessService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.route.paramMap.subscribe((params: ParamMap) => {
//       const wid = Number(params.get('wid'));
//       this.wid = wid; 

//       this.apiser.getWorkoutById(wid).subscribe(
//         (workout: Workout) => {
//           this.work = workout;
//         },
//         (error) => {
//           console.error('Error retrieving workout:', error);
//           alert('Failed to retrieve workout');
//         }
//       );
//     });
//   }

//   put() {
//     this.apiser.updatew(this.work)
//       .subscribe(
//         () => {
//           alert('Workout updated');
//           this.router.navigate(['/workouts']); 
//         },
//         (error) => {
//           console.error('Error updating workout:', error);
//           alert('Failed to update workout');
//         }
//       );
//   }
// }
