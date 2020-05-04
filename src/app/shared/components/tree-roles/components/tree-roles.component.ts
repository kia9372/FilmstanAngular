import { OnInit, Output, EventEmitter, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DeleteEntityDialogComponent } from '@app/views/partials/content/crud';
import { TableFilterRules, TableSearch } from '@app/core/models/table-filter';
import { MatDialog } from '@angular/material/dialog';
import { TreeBuilder } from '../utils/tree-builder';
import { ItemFlatNode } from '../model/ItemFlatNode.model';
import { ItemNode } from '../model/ItemNode.model';
export interface FileNode {
    id: number;
    title: string;
    parentId: number;
    selected: boolean;
    isChilde: boolean;
    children?: FileNode[];
}

/** Flat node with expandable and level information */
export interface TreeNode {
    id: number;
    title: string;
    parentId: number;
    selected: boolean;
    isChilde: boolean;
    level: number;
    expandable: boolean;
}
@Component({
    selector: 'fim-role-tree',
    templateUrl: './tree-roles.component.html',
    styleUrls: ['./tree-roles.component.scss'],
    providers: [TreeBuilder]
})
export class TreeRolesComponent implements OnInit, AfterViewInit {
    @Output() selectedList = new EventEmitter<any>();
    @Input() checkAble = true;
    @Input() data: any;

    InitData = [];
    treeControl: FlatTreeControl<ItemFlatNode>;
    treeFlattener: MatTreeFlattener<ItemNode, ItemFlatNode>;
    dataSource: MatTreeFlatDataSource<ItemNode, ItemFlatNode>;
    dataChange = new BehaviorSubject<ItemNode[]>([]);

    //get data(): ItemNode[] { return this.dataChange.value; }
    /** The selection for checklist */
    checklistSelection = new SelectionModel<ItemFlatNode>(true);
    defualtSelected: ItemFlatNode[];
    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    flatNodeMap = new Map<ItemFlatNode, ItemNode>();
    searchParam: any;
    loading = false;

    constructor(
        private database: TreeBuilder,
        private cdRef: ChangeDetectorRef,
        private dialog: MatDialog
    ) {

        this.searchParam = {
            _search: true,
            dateTimeType: 1,
            page: 1,
            rows: 2
        };
        this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
            this._isExpandable, this._getChildren);
        this.treeControl = new FlatTreeControl<ItemFlatNode>(this._getLevel, this._isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        database.dataChange.subscribe(data => this.dataSource.data = data);
    }
    ngAfterViewInit(): void {
        this.treeControl.expand(this.treeControl.dataNodes[1]);
    }

    ngOnInit(): void {
        this.intialDataa();
    }

    setDefualtSelected(): void {
        for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
            for (let j = 0; j < this.defualtSelected.length; j++) {
                if (this.treeControl.dataNodes[i].actionId === this.defualtSelected[j].actionId) {
                    this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
                    this.treeControl.expand(this.treeControl.dataNodes[i]);
                    break;
                }
            }
        }
    }

    transformer = (node: ItemNode, level: number) => {
        return new ItemFlatNode(!!node.children, node.actionId, node.name, level);
    }

    intialDataa(): any {
        this.searchParam.page = 1;
        this.searchParam.rows = 1000;
        this.loading = true;
        this.rolesToTree(this.data);
    }

    rolesToTree(roles): void {
        const selections: ItemFlatNode[] = [];
        const controllers = [];
        roles.forEach(element => {
            const attrs = [];
            element['actionInfos'].forEach(attr => {
                const secAction = { name: attr['actionDisplayName'], actionId:`${element['controllerName']}:${attr['actionName']}`  };
                attrs.push(secAction);
                if (attr['isSelected'] === true) {
                    const a = new ItemFlatNode(false, attr['actionName'], attr['actionDisplayName'], 3);
                    selections.push(a);
                }
            });
            const controller = { name: element['controllerDisplayName'], actionId: element['controllerName'], children: attrs };
            controllers.push(controller);
        });
        //   this.checklistSelection = new SelectionModel<ItemFlatNode>(true, selections);
        this.defualtSelected = selections;
        const data = [{ name: 'All', actionId: 'sds', children: controllers }];
        this.database.dataChange.next(this.database.builTree(controllers, 0));
        this.loading = false;
        this.setDefualtSelected();
        this.cdRef.detectChanges();
    }

    private _getLevel = (node: ItemFlatNode) => node.level;

    private _isExpandable = (node: ItemFlatNode) => node.expandable;

    private _getChildren = (node: ItemNode): Observable<ItemNode[]> => observableOf(node.children);

    hasChild = (_: number, _nodeData: ItemFlatNode) => _nodeData.expandable;
    /** Whether all the descendants of the node are selected */
    descendantsAllSelected(node: ItemFlatNode): boolean {
         this.selectedList.emit(this.checklistSelection.selected);
        const descendants = this.treeControl.getDescendants(node);
        return (this.checklistSelection.isSelected(node) && descendants.length == 0) || (descendants.length > 0 && descendants.every(child => this.checklistSelection.isSelected(child)));
    }

    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: ItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: ItemFlatNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants)
            : this.checklistSelection.deselect(...descendants);
    }
    builTree(obj: any, level: number): ItemNode[] {
        return Object.keys(obj).reduce<ItemNode[]>((accumulator, key) => {
            const value = obj[key];
            const node = new ItemNode(value.actionId, value.name);
            if (value != null) {
                if (typeof value === 'object') {
                    if (value.children !== undefined) {
                        node.children = this.builTree(value.children, level + 1);
                    }

                }
            }

            return accumulator.concat(node);
        }, []);
    }
}

