import './CardManager.less'
import React, {PropTypes} from 'react'
import Base from "../Base"


export default class CardManager extends Base {  
  static propTypes = {
    action: PropTypes.node,
    card: PropTypes.node,
    list: PropTypes.node.isRequired,
  }


  constructor(props) {
    super(props)
    this.state = {mediaType: null}
  }


  render() {
    const close = this.state.mediaType == "sm" &&
      <div className={this.c("close")}>
        <Icon type="close" />
      </div>

    // TODO
    return (
      <div {...this.baseProps()}>
        
      </div>
    )
  }
}


//         <div className="CardManager-list ContactList">
//           <div className="toolbarSpacer" />
//           <ui.Paper className="ContactList-paper" shape="square">
//             <ui.ScrollBox className="ContactList-scrollbox">
//               <ui.List>
//                 <ui.List.IconGroupTile onClick={@onSelectListItem} firstInGroup="star" className="selected">
//                   <ui.List.Avatar placeholderIcon="user" />
//                   <ui.List.LabeledText label="Rhianna Nelson">Wildest Weddings</ui.List.LabeledText>
//                   <ui.List.IconMenu iconType="details-menu" onSelectItem={@onSelectMenuItem}>
//                     <ui.MenuItem label="Delete" value="delete" />
//                   </ui.List.IconMenu>
//                 </ui.List.IconGroupTile>

//                 <ui.List.IconGroupTile onClick={@onSelectListItem} firstInGroup="B">
//                   <ui.List.Avatar src="/images/bill-gates-40.jpg" placeholderIcon="user" />
//                   <ui.List.LabeledText label="Bill Gates">Microsoft</ui.List.LabeledText>
//                   <ui.List.IconMenu iconType="details-menu" onSelectItem={@onSelectMenuItem}>
//                     <ui.MenuItem label="Delete" value="delete" />
//                   </ui.List.IconMenu>
//                 </ui.List.IconGroupTile>

//                 <ui.List.IconGroupTile onClick={@onSelectListItem} firstInGroup="E">
//                   <ui.List.Avatar src="/images/elon-musk-40.jpg" placeholderIcon="user" />
//                   <ui.List.LabeledText label="Elon Musk">SpaceX</ui.List.LabeledText>
//                   <ui.List.IconMenu iconType="details-menu" onSelectItem={@onSelectMenuItem}>
//                     <ui.MenuItem label="Delete" value="delete" />
//                   </ui.List.IconMenu>
//                 </ui.List.IconGroupTile>

//                 <ui.List.IconGroupTile onClick={@onSelectListItem} firstInGroup="J">
//                   <ui.List.Avatar src="/images/jeff-bezos-40.jpg" placeholderIcon="user" />
//                   <ui.List.LabeledText label="Jeff Bezos">Amazon</ui.List.LabeledText>
//                   <ui.List.IconMenu iconType="details-menu" onSelectItem={@onSelectMenuItem}>
//                     <ui.MenuItem label="Delete" value="delete" />
//                   </ui.List.IconMenu>
//                 </ui.List.IconGroupTile>

//                 <ui.List.IconGroupTile onClick={@onSelectListItem} firstInGroup="L">
//                   <ui.List.Avatar src="/images/larry-ellison-40.jpg" placeholderIcon="user" />
//                   <ui.List.LabeledText label="Larry Ellison">Oracle</ui.List.LabeledText>
//                   <ui.List.IconMenu iconType="details-menu" onSelectItem={@onSelectMenuItem}>
//                     <ui.MenuItem label="Delete" value="delete" />
//                   </ui.List.IconMenu>
//                 </ui.List.IconGroupTile>

//                 <ui.List.IconGroupTile onClick={@onSelectListItem}>
//                   <ui.List.Avatar src="/images/larry-page-40.jpg" placeholderIcon="user" />
//                   <ui.List.LabeledText label="Larry Page">Google</ui.List.LabeledText>
//                   <ui.List.IconMenu iconType="details-menu" onSelectItem={@onSelectMenuItem}>
//                     <ui.MenuItem label="Delete" value="delete" />
//                   </ui.List.IconMenu>
//                 </ui.List.IconGroupTile>

//                 <ui.List.IconGroupTile onClick={@onSelectListItem} firstInGroup="M">
//                   <ui.List.Avatar src="/images/marissa-mayer-40.jpg" placeholderIcon="user" />
//                   <ui.List.LabeledText label="Marissa Mayer">Yahoo!</ui.List.LabeledText>
//                   <ui.List.IconMenu iconType="details-menu" onSelectItem={@onSelectMenuItem}>
//                     <ui.MenuItem label="Delete" value="delete" />
//                   </ui.List.IconMenu>
//                 </ui.List.IconGroupTile>

//                 <ui.List.IconGroupTile onClick={@onSelectListItem}>
//                   <ui.List.Avatar src="/images/mark-zuckerberg-40.jpg" placeholderIcon="user" />
//                   <ui.List.LabeledText label="Mark Zuckerberg">Facebook</ui.List.LabeledText>
//                   <ui.List.IconMenu iconType="details-menu" onSelectItem={@onSelectMenuItem}>
//                     <ui.MenuItem label="Delete" value="delete" />
//                   </ui.List.IconMenu>
//                 </ui.List.IconGroupTile>

//                 <ui.List.IconGroupTile onClick={@onSelectListItem}>
//                   <ui.List.Avatar src="/images/masayoshi-son-40.jpg" placeholderIcon="user" />
//                   <ui.List.LabeledText label="Masayoshi Son">Softbank</ui.List.LabeledText>
//                   <ui.List.IconMenu iconType="details-menu" onSelectItem={@onSelectMenuItem}>
//                     <ui.MenuItem label="Delete" value="delete" />
//                   </ui.List.IconMenu>
//                 </ui.List.IconGroupTile>

//                 <ui.List.IconGroupTile onClick={@onSelectListItem} firstInGroup="P">
//                   <ui.List.Avatar src="/images/paul-graham-40.jpg" placeholderIcon="user" />
//                   <ui.List.LabeledText label="Paul Graham">Y Combinator</ui.List.LabeledText>
//                   <ui.List.IconMenu iconType="details-menu" onSelectItem={@onSelectMenuItem}>
//                     <ui.MenuItem label="Delete" value="delete" />
//                   </ui.List.IconMenu>
//                 </ui.List.IconGroupTile>

//                 <ui.List.IconGroupTile onClick={@onSelectListItem} firstInGroup="T">
//                   <ui.List.Avatar src="/images/terry-gou-40.jpg" placeholderIcon="user" />
//                   <ui.List.LabeledText label="Terry Gou">Foxconn</ui.List.LabeledText>
//                   <ui.List.IconMenu iconType="details-menu" onSelectItem={@onSelectMenuItem}>
//                     <ui.MenuItem label="Delete" value="delete" />
//                   </ui.List.IconMenu>
//                 </ui.List.IconGroupTile>

//                 <ui.List.IconGroupTile onClick={@onSelectListItem}>
//                   <ui.List.Avatar src="/images/tim-cook-40.jpg" placeholderIcon="user" />
//                   <ui.List.LabeledText label="Tim Cook">Apple</ui.List.LabeledText>
//                   <ui.List.IconMenu iconType="details-menu" onSelectItem={@onSelectMenuItem}>
//                     <ui.MenuItem label="Delete" value="delete" />
//                   </ui.List.IconMenu>
//                 </ui.List.IconGroupTile>

//               </ui.List>
//             </ui.ScrollBox>
//           </ui.Paper>
//         </div>
//         <div className="CardManager-card">
//           <ui.CardLayout
//             className="CardManager-card-layout"
//             actions={cardActions}
//             header={cardHeader}
//             main={cardMain}
//             footer={cardFooter}
//           />
//         </div>
//         <div className="CardManager-action">
//           <ui.FloatingActionButtonExpander iconType="add">
//             <ui.FloatingActionButton iconType="edit" />
//             <ui.FloatingActionButton iconType="F" />
//           </ui.FloatingActionButtonExpander>
//         </div>
//       </div>
//     </div>
