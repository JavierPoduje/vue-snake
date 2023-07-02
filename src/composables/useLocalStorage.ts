const useLocalStorage = () => {
  const setItem = (key: string, value: string) =>
    localStorage.setItem(key, value)

  const getItem = (key: string) => localStorage.getItem(key)

  return { setItem, getItem }
}

export default useLocalStorage
