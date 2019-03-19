import React, { createContext } from "react";

// Interfaces
import { ProviderStoreInterface } from "../interfaces/form.interface";

export default createContext<ProviderStoreInterface | null>(null);
