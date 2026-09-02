import { createContext, useContext, useMemo, useReducer, useState, useCallback } from 'react'

const CartContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { product, qty = 1 } = action
      const existing = state.find((i) => i.id === product.id)
      if (existing) {
        return state.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...state, { ...product, qty }]
    }
    case 'remove':
      return state.filter((i) => i.id !== action.id)
    case 'setQty':
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: Math.max(0, action.qty) } : i))
        .filter((i) => i.qty > 0)
    case 'clear':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [])
  const [isOpen, setOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const add = useCallback((product, qty = 1) => {
    dispatch({ type: 'add', product, qty })
    setToast({ id: Date.now(), name: product.name })
  }, [])

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0)
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0)
    return {
      items,
      count,
      subtotal,
      isOpen,
      toast,
      dismissToast: () => setToast(null),
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen((o) => !o),
      add,
      remove: (id) => dispatch({ type: 'remove', id }),
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
      clear: () => dispatch({ type: 'clear' }),
    }
  }, [items, isOpen, toast, add])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
