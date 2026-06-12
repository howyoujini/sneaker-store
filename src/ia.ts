// AUTO-GENERATED information-architecture tree for the preview shell.
export interface IaNode {
  label: string;
  /** Manifest screen label this node opens; pure groups omit it. */
  screen?: string;
  children: IaNode[];
}
export const NAV_TYPE: string | null = "Bottom tab bar";
export const IA_TREE: IaNode[] = [
  {
    "label": "Homepage",
    "screen": "Homepage",
    "children": []
  },
  {
    "label": "Browse",
    "screen": "Browse",
    "children": [
      {
        "label": "Product detail",
        "screen": "Product detail",
        "children": []
      }
    ]
  },
  {
    "label": "Cart",
    "screen": "Cart",
    "children": [
      {
        "label": "Login",
        "screen": "Login",
        "children": []
      },
      {
        "label": "Checkout",
        "screen": "Checkout",
        "children": [
          {
            "label": "Order confirmation",
            "screen": "Order confirmation",
            "children": []
          }
        ]
      }
    ]
  }
];
