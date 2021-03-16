import { Component, OnInit } from '@angular/core';
import { BreadcrumbFacadeService } from '../common-components/components/breadcrumb/store/breadcrumb.facade';
import { FormGroup } from '@angular/forms';
import { NewEventFacadeService } from './store/event.facade';
import { Tabs } from '../common-components/components/tab-navigation/models/tabs';
import { Task } from '../common-components/components/tasks-creator/models/task';

@Component({
	selector: 'app-event-creation',
	templateUrl: './event-creation.component.html',
	styleUrls: ['./event-creation.component.scss'],
})
export class EventCreationComponent implements OnInit {
	public currentTab: Tabs = Tabs.General;
  public tabsEnum: typeof Tabs = Tabs;

	private formFromGeneralComponent: FormGroup;
	private task: Task;

	constructor(public breadcrumbFacadeService: BreadcrumbFacadeService, public newEventsFacadeService: NewEventFacadeService) {
	}

	public ngOnInit(): void {
		this.breadcrumbFacadeService.loadBreadcrumb('New Event');
	}

	public changeTab(tab: Tabs): void {
		this.currentTab = tab;
	}

  public send(isDraft: boolean): void {
    switch (this.currentTab) {
      case Tabs.General:
        this.formFromGeneralComponent.patchValue({
          isDraft,
        });
        this.newEventsFacadeService.createGeneralEvent(this.formFromGeneralComponent.value);
        break;

      case Tabs.Tasks:
        this.task.isDraft = isDraft;
        this.newEventsFacadeService.createTask(this.task);
        break;

      case Tabs.Invitations:
        break;

      default:
    }
  }

	public setFormFromGeneralComponent(data: FormGroup): void {
		this.formFromGeneralComponent = data;
	}

  public setTaskCreationForm(task: Task): void {
    this.task = task;
  }

  public removeTask(id: Symbol): void {
	  this.newEventsFacadeService.deleteTask(id);
  }
}
